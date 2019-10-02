import React from "react"
import { graphql } from "gatsby"
import { format, parse, isPast } from "date-fns"

import HomePage from "../layouts/HomePage"
import SEO from "../components/seo"
import EventOverview from "../components/EventOverview"
import Talk from "../components/Talk"
import GiveATalk from "../components/GiveATalk"
import Newsletter from "../components/Newsletter"

const ArchivePage = ({ data }) => {
  let talk = data.talk.edges.length && data.talk.edges[0].node
  // if (talk) {
  //   talk.date = parse(talk.date, "yyyy-MM-dd HH:mm", new Date())
  //   talk.tickets_released = parse(
  //     talk.tickets_released,
  //     "yyyy-MM-dd HH:mm",
  //     new Date()
  //   )
  // }
  const hasTickets =
    talk && talk.registration_url && isPast(talk.tickets_released)
  return (
    <HomePage tickets={hasTickets && talk.registration_url}>
      <SEO title="Home" />
      <GiveATalk />
      <Newsletter />
    </HomePage>
  )
}

export const query = graphql`
  query GetArchiveUpcomingEvent($today: Float) {
    talk: allEventsJson(
      sort: { fields: fields___timestamp, order: DESC }
      limit: 1
      filter: { fields: { timestamp: { gte: $today } } }
    ) {
      edges {
        node {
          date
          tickets_released
          registration_url
        }
      }
    }
  }
`

export default ArchivePage
