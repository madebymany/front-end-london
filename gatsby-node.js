const path = require("path")
const {
  writeFileSync,
  readFileSync,
  createWriteStream,
  existsSync,
} = require("fs")
const { parse } = require("date-fns")
const glob = require("glob")
const axios = require("axios")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `EventsJson`) {
    const parsedDate = parse(node.date, "yyyy-MM-dd HH:mm", new Date())
    createNodeField({
      node,
      name: "timestamp",
      value: parsedDate.getTime(),
    })

    const parsedTickets = parse(
      node.tickets_released,
      "yyyy-MM-dd HH:mm",
      new Date()
    )
    createNodeField({
      node,
      name: "ticket_timestamp",
      value: parsedTickets.getTime(),
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  createPage({
    ...page,
    context: {
      ...page.context,
      today: new Date().getTime(),
    },
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      query ArchiveListCount($today: Float!) {
        allEventsJson(
          sort: { fields: fields___timestamp, order: DESC }
          filter: { fields: { timestamp: { lt: $today } } }
          limit: 1000
        ) {
          totalCount
        }
      }
    `,
    {
      today: new Date().getTime(),
    }
  )
  if (result.errors) {
    reporter.panicOnBuild(`Error while running Archive GraphQL query.`)
    return
  }

  const posts = result.data.allEventsJson.totalCount
  const postsPerPage = 2
  const numPages = Math.ceil(posts / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/archive` : `/archive/${i + 1}`,
      component: path.resolve("./src/templates/Archive.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        today: new Date().getTime(),
      },
    })
  })
}

exports.onPreBootstrap = async () => {
  const getPosters = id => [
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
  ]

  const imagePath = path.join(__dirname, "assets", "images", "posters")

  const fetchPoster = (url, id) =>
    new Promise(resolve =>
      axios
        .head(url)
        .then(() =>
          axios
            .get(url, { responseType: "stream" })
            .then(({ data }) =>
              data.pipe(createWriteStream(path.join(imagePath, `${id}.jpg`)))
            )
            .then(() => {
              resolve(url)
            })
        )
        .catch(() => {
          resolve(false)
        })
    )

  // Scan event json and attempt to fetch youtube_ids
  const events = glob.sync(path.join("content", "events", "*.json"), {
    absolute: true,
  })

  const eventData = events.map(path => readFileSync(path)).map(JSON.parse)

  const foundPosters = []

  eventData.forEach((event, eventIndex) => {
    event.speakers.forEach(async (speaker, speakerIndex) => {
      const id = speaker.youtube_id
      if (id && !existsSync(path.join(imagePath, `${id}.jpg`))) {
        const posters = getPosters(id)
        let found = false
        for (let i = 0; i < posters.length; i += 1) {
          found = await fetchPoster(posters[i], id)

          if (found) {
            foundPosters.push(found)

            // Add poster to json and write back
            const newEventJson = { ...event }
            newEventJson.speakers[speakerIndex].poster = path.join(
              imagePath.replace(__dirname, path.join("..", "..")),
              `${id}.jpg`
            )

            writeFileSync(
              events[eventIndex],
              JSON.stringify(newEventJson, null, 2),
              "utf8"
            )
            break
          }
        }
      }
    })
  })

  console.log(`Added ${foundPosters.length} new Youtube poster/s.`)
}

exports.onPostBuild = async ({ graphql }) => {
  const publicPath = path.resolve("./public")

  const result = await graphql(
    `
      query ArchiveSearch($today: Float!) {
        allEventsJson(
          sort: { fields: fields___timestamp, order: DESC }
          filter: { fields: { timestamp: { lt: $today } } }
          limit: 1000
        ) {
          edges {
            node {
              date(formatString: "MMM, YYYY")
              fields {
                timestamp
              }
              speakers {
                name
                twitter
                topic
                description
                slides_url
                video_url
                youtube_id
                poster
              }
            }
          }
        }
      }
    `,
    {
      today: new Date().getTime(),
    }
  )

  // Transform results
  const data = result.data.allEventsJson.edges.map(item => item.node)

  writeFileSync(
    path.join(publicPath, "search.json"),
    JSON.stringify(data),
    "utf8"
  )
}
