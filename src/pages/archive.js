import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import SEO from "../components/seo"
import Container from "../components/Container"

import Archived from "../components/Archived"

const FillWrapper = styled.div`
  background-color: white;
`

const Archive = ({
  data: { events },
  pageContext: { numPages, uuid },
  location: { state },
  ...props
}) => {
  const lazyLoadIndex = (state && state.lazyLoadIndex) || 0
  const defaultQuery = (state && state.query) || ""
  const talks = events.edges
    .map(edge => edge.node)
    .reduce((accum = [], event) => {
      event.speakers.forEach(speaker => {
        accum.push({
          ...speaker,
          date: event.date,
          timestamp: new Date(event.fields.timestamp),
        })
      })
      return accum
    }, [])
  return (
    <>
      <SEO title="Past talks" />
      <FillWrapper>
        <Container>
          <Archived
            defaultQuery={defaultQuery}
            talks={talks}
            index={lazyLoadIndex}
          />
        </Container>
      </FillWrapper>
    </>
  )
}

export const query = graphql`
  query TestListQuery($today: Float!) {
    events: allEventsJson(
      sort: { fields: fields___timestamp, order: DESC }
      filter: { fields: { timestamp: { lt: $today } } }
      limit: 1000
    ) {
      edges {
        node {
          date(formatString: "MMM, YYYY")
          speakers {
            name
            twitter
            topic
            description
            slides_url
            video_url
            poster {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            timestamp
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

export default Archive
