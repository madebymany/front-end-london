import React from "react"
import { graphql } from "gatsby"
import { Router } from "@reach/router"

import Animated from "../layouts/Animated"
import Container from "../components/Container"
import Search from "../components/Search"

/**
 * Client Only Route
 */
const SearchPage = ({ location: { state }, ...props }) => (
  <Animated key="search" {...props} {...state}>
    <Container>
      <Router>
        <Search path="/search/:query/" />
      </Router>
    </Container>
  </Animated>
)

export const query = graphql`
  query SearchPage($today: Float) {
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

export default SearchPage
