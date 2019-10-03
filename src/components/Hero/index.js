import React from "react"
import styled, { css } from "styled-components"

import HeroVideo from "./HeroVideo"
import HeroContent from "./HeroContent"
import { medium, large } from "../../styles/media"
import c from "../../styles/constants"

const Wrapper = styled.div`
  width: 100%;
  transition: 0.3s all;
  background-color: ${c.ORANGE};
  ${props =>
    props.fixed
      ? css`
          position: fixed;
          top: 10%;
          left: 5%;
          width: 90%;
          max-height: 80%;
        `
      : css`
          position: relative;
          display: flex;
          align-items: center;
          flex-direction: column-reverse;
          margin-bottom: ${c.XL6};

          ${large`
            margin-bottom: 110px;
            flex-direction: column;
          `}
        `}

  ${large`
    background-color: transparent;
  `}
`

class Hero extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }

    this.onPlay = this.onPlay.bind(this)
  }

  onPlay() {
    this.setState({ open: true })
  }

  render() {
    const { width, open } = this.state
    return (
      <Wrapper fixed={open}>
        <HeroVideo open={open} />
        <HeroContent onPlay={this.onPlay} />
      </Wrapper>
    )
  }
}

export default Hero
