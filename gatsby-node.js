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
            .catch(e => {
              resolve(false)
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

  let foundPosters = 0

  eventData.forEach((event, eventIndex) => {
    event.speakers.forEach(async (speaker, speakerIndex) => {
      if (!speaker.video_url || speaker.poster) {
        return
      }
      const videoUrl = speaker.video_url
      // Check if it's a youtube url
      const variant = ["//www.youtube.com/watch?v=", "//youtu.be/"].find(
        match => videoUrl.indexOf(match) !== -1
      )

      if (!variant) {
        console.log(`${event.date} - ${speaker.name} - missing thumbnail`)
        return
      }

      const id = videoUrl.replace(variant, "").split("&")[0]
      if (id && !existsSync(path.join(imagePath, `${id}.jpg`))) {
        const posters = getPosters(id)
        let found = false
        for (let i = 0; i < posters.length; i += 1) {
          found = await fetchPoster(posters[i], id)

          if (found) {
            foundPosters += 1

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

  console.log(`Added ${foundPosters} new Youtube poster/s.`)
}
