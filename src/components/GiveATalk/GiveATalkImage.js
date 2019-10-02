import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

import Blob from "../Blob"
import c from "../../styles/constants"

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
`

const GiveATalkImage = ({ image }) => (
  <Wrapper>
    <Blob
      complexity={0.3}
      contrast={0.4}
      fill={c.WHITE}
      transform="scale(1.6, 1.3)"
      rotate
    >
      <Img fluid={image} alt="Frontend London Audience" />
    </Blob>
  </Wrapper>
)

export default GiveATalkImage
