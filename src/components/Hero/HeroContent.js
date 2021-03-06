import React from "react"
import styled, { css, keyframes } from "styled-components"

import { Row, Column } from "../Grid"
import Container from "../Container"
import { Button } from "../Button"
import { medium, large, xlarge } from "../../styles/media"
import c from "../../styles/constants"

import MadeByMany from "../../../assets/images/madebymany-white.svg"

const tada = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  visibility: visible;
  max-height: 200vh;
  transition: opacity 0.5s 1s, visibility 0.5s, max-height 0.5s;

  ${props =>
    props.theme.open &&
    `
    max-height: 0;
    transition: opacity 0.5s, visibility 0.5s, max-height 0.5s 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    opacity: 0;
    visibility: hidden;

  `}

  ${large`
    position: absolute;
  `}
`

const HeroRow = styled(Row)`
  display: flex;
  color: ${c.WHITE};
  align-items: flex-end;
  margin-top: ${c.XL6};

  ${large(css`
    margin-top: ${c.XL5};
  `)}

  ${xlarge(css`
    margin-top: ${c.XL7};
  `)}
`

const Heading = styled.h1`
  font-weight: ${c.MEDIUM};
  font-size: 62vw;
  margin: 0 0 0 -4.8vw;
  line-height: 0.8;
  letter-spacing: -5.4px;

  ${medium(css`
    margin: 0 0 ${c.SMALL} -${c.XL2};
    font-size: 282px;
  `)}

  ${large`
    font-size: 250px;
  `}

  ${xlarge`
    font-size: 282px;
  `}
`

const Copy = styled.p`
  font-weight: 300;
  line-height: 1.5;
  font-size: ${c.XL2};

  ${medium`
    max-width: 60%;
    font-size: 30px;
  `}

  ${large`
    line-height: 1.2;
    font-size: 39px;
    max-width: 90%;
  `}

  ${xlarge`
    line-height: 1.5;
    max-width: 100%;
  `}
`

const ByLine = styled.span`
  display: flex;
  align-items: center;
  font-weight: ${c.BOLD};
  font-size: ${c.SMALL};

  span {
    text-transform: uppercase;
  }

  a {
    &:focus,
    &:hover {
      outline: 0;
      animation: ${tada} 1.3s linear forwards;
    }
  }

  img {
    margin-left: ${c.BASE};
  }
`

const VideoButton = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 0%;

  ${large`
    position: relative;
  `}
`

const HeroContent = ({ onPlay, open }) => (
  <Wrapper theme={{ open }}>
    <Container>
      <HeroRow>
        <Column lg={0.55} xl={0.57}>
          <Heading>FEL</Heading>
          <Copy>
            Front-end London is a meetup focused on technology, design &amp;
            product development
          </Copy>
          <ByLine>
            <span>Presented by</span>
            <a
              href="https://www.madebymany.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={MadeByMany} alt="Made by many" />
            </a>
          </ByLine>
        </Column>
        <Column lg={0.45} xl={0.43}>
          <VideoButton onClick={onPlay}>Play video</VideoButton>
        </Column>
      </HeroRow>
    </Container>
  </Wrapper>
)

export default HeroContent
