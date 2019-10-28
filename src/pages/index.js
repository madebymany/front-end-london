import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { parse, isPast } from "date-fns"

import Hero from "../components/Hero"

import SEO from "../components/seo"
import EventOverview from "../components/EventOverview"
import Talk from "../components/Talk"
import GiveATalk from "../components/GiveATalk"
import Newsletter from "../components/Newsletter"

import c from "../styles/constants"

const Wrapper = styled.div`
  background-color: ${c.WHITE};
`

const IndexPage = ({ data, ...rest }) => {
  let talk = data.talk.edges.length && { ...data.talk.edges[0].node }
  if (talk) {
    talk.date = talk.date && parse(talk.date, "yyyy-MM-dd HH:mm", new Date())
    talk.tickets_released =
      talk.tickets_released &&
      parse(talk.tickets_released, "yyyy-MM-dd HH:mm", new Date())
    talk.availability = isPast(talk.tickets_released)
  }
  return (
    <>
      <SEO title="Home" />
      <Hero />
      <Wrapper>
        <EventOverview talk={talk} />
        <Talk talk={talk} />
        <GiveATalk />
        <Newsletter />
      </Wrapper>
    </>
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

export default IndexPage
