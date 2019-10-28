import React from "react"
import styled, { css } from "styled-components"

import Container from "../Container"
import { Row, Column } from "../Grid"

import NextEvent from "./NextEvent"
import EventSummary from "./EventSummary"

import { medium } from "../../styles/media"
import c from "../../styles/constants"

const Wrapper = styled.div`
  margin-top: ${c.XL6};
  background-color: ${c.WHITE};

  ${medium(css`
    margin-top: ${c.XL9};
  `)}
`

const EventOverview = ({ talk }) => {
  const talkSpreadable = (talk && { ...talk }) || {}
  return (
    <Wrapper>
      <Container>
        <Row justify="space-between">
          <Column lg={0.3}>
            <NextEvent {...talkSpreadable} />
          </Column>
          <Column lg={0.7}>
            <EventSummary {...talkSpreadable} />
          </Column>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default EventOverview
