import React from "react"
import styled from "styled-components"

import c from "../../styles/constants"
import { Row } from "../Grid"
import { Heading } from "../Text"
import { MonoArrowLink } from "../Links"

const Wrapper = styled(Row)`
  border-bottom: 1px solid ${c.GREY};
`

const TalkHeader = () => (
  <Wrapper justify="space-between" align="center">
    <Heading>Talks this month</Heading>
    <MonoArrowLink to="/archive/">Past talks</MonoArrowLink>
  </Wrapper>
)

export default TalkHeader
