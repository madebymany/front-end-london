import React from "react"
import styled from "styled-components"

import { Heading, Copy } from "../Text"
import { MonoLink, ExternalMonoLink } from "../Links"

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
  display: flex;
  flex-direction: column;
`

const GiveATalkContent = () => (
  <Wrapper>
    <PaddedHeading>Want to give a talk at FEL?</PaddedHeading>
    <Copy>
      We would like to hear from first-time and seasoned speakers alike. Get in
      touch if you’d like to propose a talk or recommend a speaker. For more
      information contact us:
    </Copy>
    <LinkGroup>
      <MonoLink as="a" href="mailto:fel@madebymany.co.uk">
        fel@madebymany.co.uk
      </MonoLink>
      <ExternalMonoLink href="https://twitter.com/frontendlondon">
        @frontendlondon
      </ExternalMonoLink>
    </LinkGroup>
  </Wrapper>
)

export default GiveATalkContent
