import React from "react"
import { graphql } from "gatsby"

import Animated from "../layouts/Animated"
import SEO from "../components/seo"

import c from "../styles/constants"

const ConductPage = ({ data, ...rest }) => {
  return (
    <Animated {...rest} fill={c.WHITE}>
      <SEO title="Code of Conduct" />
      Code of Conduct
    </Animated>
  )
}

export const query = graphql`
  query ConductPage($today: Float) {
    current: allEventsJson(
      sort: { fields: fields___timestamp, order: DESC }
      limit: 1
      filter: {
        fields: {
          timestamp: { gte: $today }
          ticket_timestamp: { lte: $today }
        }
      }
    ) {
      edges {
        node {
          registration_url
        }
      }
    }
  }
`

export default ConductPage
