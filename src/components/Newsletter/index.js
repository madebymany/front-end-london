import React from "react"
import styled from "styled-components"

import Container from "../Container"
import { Heading, Copy } from "../Text"
import Wave from "../Wave"

import { medium } from "../../styles/media"
import c from "../../styles/constants"

import NewsletterForm from "./NewsletterForm"

const FullWidth = styled.div`
  position: relative;
  width: 100%;
  padding: 4rem 0 ${c.XL5} 0;

  ${medium`
    padding: 4rem 0 10rem 0;
  `}
`

const Newsletter = () => (
  <Wave fill={c.LIGHT_GREY}>
    <FullWidth id="newsletter">
      <Container>
        <Heading>Want to keep in touch?</Heading>
        <Copy>
          Sign up to our newsletter to keep up to date about the next event
        </Copy>
        <NewsletterForm />
      </Container>
    </FullWidth>
  </Wave>
)

export default Newsletter
