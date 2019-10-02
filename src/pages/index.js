import React from "react"
import { graphql } from "gatsby"
import { parse, isPast } from "date-fns"

import HomePage from "../layouts/HomePage"
import SEO from "../components/seo"
import EventOverview from "../components/EventOverview"
import Talk from "../components/Talk"
import GiveATalk from "../components/GiveATalk"
import Newsletter from "../components/Newsletter"

const IndexPage = ({ data }) => {
  let talk = data.talk.edges.length && { ...data.talk.edges[0].node }
  if (talk) {
    talk.date = talk.date && parse(talk.date, "yyyy-MM-dd HH:mm", new Date())
    talk.tickets_released =
      talk.tickets_released &&
      parse(talk.tickets_released, "yyyy-MM-dd HH:mm", new Date())
    talk.availability = isPast(talk.tickets_released)
  }
  const hasTickets = talk && talk.registration_url && talk.availability
  return (
    <HomePage tickets={hasTickets && talk.registration_url}>
      <SEO title="Home" />
      <EventOverview talk={talk} />
      <Talk talk={talk} />
      <GiveATalk />
      <Newsletter />
    </HomePage>
  )
}

export const query = graphql`
  query IndexPage($today: Float) {
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
          speakers {
            ...Speaker
          }
        }
      }
    }
  }
`

export default IndexPage
