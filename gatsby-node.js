const { parse } = require("date-fns")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `EventsJson`) {
    const parsedDate = parse(node.date, "yyyy-MM-dd HH:mm", new Date())
    createNodeField({
      node,
      name: "timestamp",
      value: parsedDate.getTime(),
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
