import React from "react"
import styled from "styled-components"

import Container from "../Container"
import TalkHeader from "./TalkHeader"
import Speaker from "./Speaker"
import c from "../../styles/constants"

const Wrapper = styled.div`
  margin-top: ${c.XL7};
`

const Talk = ({ speakers }) => (
  <Wrapper>
    <Container>
      <TalkHeader />
      {speakers.map(speaker => (
        <Speaker key={speaker.name} {...speaker} />
      ))}
    </Container>
  </Wrapper>
)

export default Talk
