import React from "react"
import styled from "styled-components"

import { Heading, Copy } from "../Text"
import { ExternalMonoLink } from "../Links"

import { large } from "../../styles/media"
import c from "../../styles/constants"

const Wrapper = styled.div`
  ${large`
    padding: 8rem 0 14rem 0;
  `}
`

const PaddedHeading = styled(Heading)`
  padding-right: ${c.XL8};
`

const LinkGroup = styled.div`
  display: inline-flex;
  flex-direction: column;
`

const GiveATalkContent = ({ form }) => (
  <Wrapper>
    <PaddedHeading>Want to give a talk at FEL?</PaddedHeading>
    <Copy>
      We love hearing from first-time and seasoned speakers alike. Get in touch
      if you’d like to bounce an idea for a talk off us, propose a topic, or
      recommend a speaker:
    </Copy>
    <LinkGroup>
      <div>
        <ExternalMonoLink to={form}>Submit a talk</ExternalMonoLink>
      </div>
    </LinkGroup>
  </Wrapper>
)

export default GiveATalkContent
