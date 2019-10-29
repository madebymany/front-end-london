import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { parse, isPast, format, addHours } from "date-fns"
import Helmet from "react-helmet"

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

const IndexPage = ({ data, location, ...rest }) => {
  let schema = null
  let talk = data.talk.edges.length && { ...data.talk.edges[0].node }

  if (talk) {
    talk.date = talk.date && parse(talk.date, "yyyy-MM-dd HH:mm", new Date())
    talk.tickets_released =
      talk.tickets_released &&
      parse(talk.tickets_released, "yyyy-MM-dd HH:mm", new Date())
    talk.availability = isPast(talk.tickets_released)

    schema = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: `Front-end London ${format(talk.date, "MMM '`'yy")}`,
      description: "Front-end London's monthly meetup.",
      startDate: format(talk.date, "yyyy-MM-dd'T'HH:mm"),
      endDate: format(addHours(talk.date, talk.duration), "yyyy-MM-dd'T'HH:mm"),
      location: {
        "@type": "Place",
        name: "Made by Many",
        address: {
          "@type": "PostalAddress",
          streetAddress: "38 Graham Street",
          addressLocality: "Angel",
          postalCode: "N1 8JX",
          addressRegion: "London",
          addressCountry: "GB",
        },
      },
      image: [
        `${location.origin}/share-1x1.jpg`,
        `${location.origin}/share-4x3.jpg`,
        `${location.origin}/share-16x9.jpg`,
      ],
    }

    if (talk.registration_url) {
      schema.offers = {
        "@type": "Offer",
        url: talk.registration_url,
        price: 0,
        priceCurrency: "GBP",
        validFrom: format(talk.date, "yyyy-MM-dd'T'HH:mm"),
      }

      if (talk.availability) {
        schema.offers.availability = "http://schema.org/InStock"
      }
    }
    const performers = talk.speakers.reduce((accum, speaker) => {
      let person = {
        "@type": "Person",
        name: speaker.name,
        image: `${location.origin}${speaker.pic.childImageSharp.fluid.src}`,
        worksFor: speaker.company,
        url: `https://twitter.com/${speaker.twitter}`,
      }

      if (speaker.company) {
        person.worksFor = speaker.company
      }

      if (speaker.twitter) {
        person.url = `https://twitter.com/${speaker.twitter}`
      }

      accum.push(person)
      return accum
    }, [])

    if (performers) {
      schema.performers = performers
    }
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
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}
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
          duration
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
