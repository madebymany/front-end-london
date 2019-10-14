import React from "react"
import styled from "styled-components"

import Container from "../Container"
import Speaker from "./Speaker"
import { MonoArrowLink } from "../Links"
import { Heading } from "../Text"

import { medium } from "../../styles/media"
import c from "../../styles/constants"

const Wrapper = styled.div`
  position: relative;
  margin-top: ${c.XL7};
`

const HeaderWrapper = styled.div`
  border-bottom: 1px solid ${c.GREY};
`

const PastTalksLink = styled(MonoArrowLink)`
  ${medium`
    position: absolute;
    top: 4px;
    right: 0;
  `}
`

const Speakers = styled.div`
  @media (max-width: 768px) {
    > *:last-child {
      border: none;
    }
  }
`

const Talk = ({ speakers }) => (
  <Container>
    <Wrapper>
      <HeaderWrapper>
        <Heading>Talks this month</Heading>
      </HeaderWrapper>
      <Speakers>
        {speakers.map(speaker => (
          <Speaker key={speaker.name} {...speaker} />
        ))}
      </Speakers>
      <PastTalksLink to="/archive/">Past talks</PastTalksLink>
    </Wrapper>
  </Container>
)

export default Talk
