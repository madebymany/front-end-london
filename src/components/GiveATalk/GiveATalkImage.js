import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import Blob from "../Blob"
import { large } from "../../styles/media"
import c from "../../styles/constants"

const Wrapper = styled.div`
  width: 100%;
  transform: translateX(-30%);

  ${large`
    position: absolute;
    transform: none;
  `}
`

const GiveATalkImage = ({ image }) => (
  <Wrapper>
    <Blob
      complexity={0.3}
      contrast={0.4}
      fill={c.WHITE}
      transform="scale(1.6, 1.3)"
      bleed
    >
      <Img fluid={image} alt="Frontend London Audience" />
    </Blob>
  </Wrapper>
)

export default GiveATalkImage
