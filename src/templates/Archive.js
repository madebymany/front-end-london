import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Container from "../components/Container"
import { Copy } from "../components/Text"
import { navigate } from "gatsby"

import Animated from "../layouts/Animated"
import SearchHeader from "../components/Search/SearchHeader"
import ArchivedTalks from "../components/ArchivedTalks"

import { medium } from "../styles/media"

const ArchiveHeader = styled(SearchHeader)`
  ${Copy} {
    &:before {
      content: "(";
    }

    &:after {
      content: ")";
    }

    &:before,
    &:after {
      ${medium`
        content: none;
      `}
    }
  }
`

const FillWrapper = styled.div`
  background-color: white;
`

const Archive = ({
  data: { count, talks },
  pageContext: { currentPage, numPages },
  location: { origin },
  ...props
}) => {
  return (
    <Animated {...props}>
      <FillWrapper>
        <Container>
          <ArchiveHeader
            heading="Past talks"
            formProps={{
              action: "/search/",
              method: "get",
            }}
            onSubmit={event => {
              event.preventDefault()
              const formData = new FormData(event.target)
              const search = new URLSearchParams(formData).get("s")
              navigate(`${event.target.action.replace(origin, "")}/${search}/`)
            }}
            copy={`${count.totalCount} talks`}
          />
        </Container>
        <ArchivedTalks
          talks={talks.edges}
          numPages={numPages}
          currentPage={currentPage}
          pathPrefix="/archive/"
        />
      </FillWrapper>
    </Animated>
  )
}

export const query = graphql`
  query ArchiveListQuery($skip: Int!, $limit: Int!, $today: Float!) {
    talks: allEventsJson(
      sort: { fields: fields___timestamp, order: DESC }
      filter: { fields: { timestamp: { lt: $today } } }
      limit: $limit
      skip: $skip
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
            youtube_id
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
    count: allEventsJson(
      sort: { fields: fields___timestamp, order: DESC }
      filter: { fields: { timestamp: { lt: $today } } }
    ) {
      totalCount
    }
  }
`

export default Archive
