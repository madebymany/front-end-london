import React, { useState } from "react"
import styled from "styled-components"

import HeroVideo from "./HeroVideo"
import HeroContent from "./HeroContent"
import { large } from "../../styles/media"
import c from "../../styles/constants"

const Wrapper = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  margin-top: 0;

  background-color: ${c.ORANGE};
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  transition: margin 0.5s 0.5s ease-in-out;

  @media (max-width: 1023px) {
    ${props =>
      props.theme.open &&
      `
      margin-top: 85px;
      transition: margin 0.5s ease-in-out;
    `}
  }

  ${large`
    flex-direction: column;
    background-color: transparent;
  `}
`

const Hero = () => {
  const [open, setOpen] = useState(false)
  return (
    <Wrapper className="Hero" theme={{ open }}>
      <HeroVideo open={open} setOpen={setOpen} />
      <HeroContent open={open} onPlay={() => setOpen(true)} />
    </Wrapper>
  )
}

export default Hero
