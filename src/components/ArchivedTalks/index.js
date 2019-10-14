import React from "react"

import Container from "../Container"
import ArchivedTalk from "./ArchivedTalk"
import Paginator from "../Paginator"

const ArchivedTalks = ({ talks = [], currentPage, numPages, pathPrefix }) => {
  return (
    <Container>
      {talks.map(({ node: talk }) =>
        talk.speakers.map(speaker => (
          <ArchivedTalk key={speaker.topic} date={talk.date} {...speaker} />
        ))
      )}
      <nav role="navigation" aria-label="Past Talk Navigation">
        <Paginator
          numPages={numPages}
          currentPage={currentPage}
          pathPrefix={pathPrefix}
        />
      </nav>
    </Container>
  )
}

export default ArchivedTalks
