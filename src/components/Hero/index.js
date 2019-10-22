import React, { useState } from "react"
import styled, { css } from "styled-components"

import HeroVideo from "./HeroVideo"
import HeroContent from "./HeroContent"
import { large } from "../../styles/media"
import c from "../../styles/constants"

const Wrapper = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  transition: 0.5s all;
  background-color: ${c.ORANGE};
  ${props =>
    props.fixed
      ? css`
          position: fixed;
          top: 10%;
          left: 5%;
          width: 90%;
          height: 80%;
          z-index: 100;
        `
      : css`
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column-reverse;

          ${large`
            flex-direction: column;
          `}
        `}

  ${large`
    background-color: transparent;
  `}
`

const Hero = () => {
  const [open, setOpen] = useState(false)
  return (
    <Wrapper className="Hero">
      <HeroVideo open={open} setOpen={setOpen} />
      <HeroContent open={open} onPlay={() => setOpen(true)} />
    </Wrapper>
  )
}

export default Hero
