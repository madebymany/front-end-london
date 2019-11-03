import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  useCallback,
} from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { cover } from "polished"
import Img from "gatsby-image"
import Player from "@vimeo/player"
import { useMediaQuery } from "react-responsive"

import HeroMask from "./HeroMask"
import DelayMount from "../DelayMount"
import { large } from "../../styles/media"
import c from "../../styles/constants"

const videoRatio = 0.5625 // 1920 x 1080

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
`

const VideoContainer = styled.div`
  width: 100%;
  padding-top: ${videoRatio * 100}%;
  height: 0px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${c.BLACK};
    width: 200vw;
    height: 100%;
    transform: translateX(-50%);
  }

  & > *:not(button) {
    width: 100%;
    height: 100%;
    background-color: ${c.BLACK};
    ${cover()}
  }
`

const WidthConstraint = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;

  ${large`
    margin-top: 95px;
  `}

  @media (min-width: 1460px) {
    width: 80%;
  }
`

const LoopVideo = styled.iframe`
  ${large`
    margin-left: 20%;
  `}
`

const CloseButton = styled.button`
  background-color: ${c.BLACK};
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${c.WHITE};
  padding: ${c.BASE};
  top: 0;
  right: 0;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: ${c.ORANGE};
  }

  &:focus {
    outline: 0;
  }
`
const HeroVideo = ({ open, setOpen }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "fel-intro.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  const videoRef = useRef(null)

  const player = useRef(null)

  // Set the state for when the video is fully revealed
  const [isActive, setActive] = useState(false)
  const [transform, setTransform] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Setting the transform in css doesnt provide the correct output
  // Feels like a bug
  const isXLarge = useMediaQuery({ query: `(min-width: 1460px)` })
  const isLarge = useMediaQuery({ query: `(min-width: 1024px)` })

  const calculateTransform = useCallback(() => {
    let updateTransform
    if (isXLarge) {
      updateTransform = "translate(284 40) scale(0.8 0.8)"
    } else if (isLarge) {
      updateTransform = "translate(120 40) scale(1 0.8)"
    } else {
      updateTransform = "translate(-800, -100) scale(1.2)"
    }

    return setTransform(updateTransform)
  }, [isXLarge, isLarge])

  useEffect(() => {
    calculateTransform()
  }, [isXLarge, isLarge, calculateTransform])

  // Scroll the video into view
  useEffect(() => {
    if (isActive) {
      window.scrollTo({
        top: isLarge ? 95 : 87,
        left: 0,
        behavior: "smooth",
      })
    }
  }, [isActive, isLarge])

  // When the hero is open and the videoRef is mounted init the player
  useEffect(() => {
    if (open && videoRef) {
      player.current = new Player(videoRef.current)
    }
  }, [videoRef, open])

  useLayoutEffect(() => {
    document.body.classList[open ? "add" : "remove"]("hero--open")
  }, [open])

  useEffect(() => {
    if (!open && isActive) {
      setActive(false)
      setLoaded(false)
      player.current.pause()
      player.current.setCurrentTime(0)
    }
  }, [open, isActive, setActive])

  return (
    <VideoWrapper>
      <WidthConstraint>
        <VideoContainer>
          {open ? (
            <iframe
              ref={videoRef}
              title="FEL Intro 2019"
              aria-hidden="true"
              src="https://player.vimeo.com/video/367773374"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          ) : (
            <DelayMount>
              {isLarge ? (
                <LoopVideo
                  ref={ref => {
                    if (!loaded && ref) {
                      new Player(ref).on("play", () => setLoaded(true))
                    }
                  }}
                  tabIndex="-1"
                  title="FEL Intro 2019"
                  aria-hidden="true"
                  src="https://player.vimeo.com/video/368524882?background=1"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                ></LoopVideo>
              ) : (
                <div style={{ marginLeft: "-20%" }}>
                  <Img
                    fluid={data.file.childImageSharp.fluid}
                    alt="FEL Background"
                    aria-hidden="true"
                    onLoad={() => setLoaded(true)}
                  />
                </div>
              )}
            </DelayMount>
          )}
          {isActive && (
            <CloseButton onClick={() => setOpen(false)}>
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.317 12.145l-7.434 7.434 2.828 2.828 7.438-7.437 7.437 7.437 2.828-2.828-7.6-7.602 7.561-7.563-2.828-2.828-7.566 7.566-7.567-7.566-2.828 2.828.707.707 7.024 7.024z"
                  fill="currentColor"
                />
              </svg>
            </CloseButton>
          )}
        </VideoContainer>
      </WidthConstraint>
      <HeroMask
        loaded={loaded}
        open={open}
        active={isActive}
        transform={transform}
        onAnimationComplete={() => {
          if (open) {
            setActive(true)
            player.current.play()
          }
        }}
      />
    </VideoWrapper>
  )
}

export default HeroVideo
