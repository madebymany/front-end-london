const React = require("react")

const General = require("./layouts/General").default

const Wrapper = ({ element, props }) => <General {...props}>{element}</General>

// Because the wrapper is used by both gatsby-browser and gatsby-ssr
module.exports = Wrapper
