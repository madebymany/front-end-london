import React, { useState, useLayoutEffect } from "react"
import styled from "styled-components"
import { useSpring, animated } from "react-spring"
import { cover } from "polished"
import { medium, large } from "../../styles/media"
import c from "../../styles/constants"
import Blob from "../Blob"

const videoRatio = 0.5625 // 1920 x 1080

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;

  ${medium`
    margin-top: -10rem;
  `}

  ${large`
    margin-top: 0;
  `}
`

const VideoContainer = styled.div`
  width: 100%;
  padding-top: ${videoRatio * 100}%;
  height: 0px;
  position: relative;
`

const Video = styled(animated.video)`
  max-width: 100%;
  ${cover()}
  left: 50%;
  transform: translateX(-50%);
`

const HeroVideo = ({ open }) => {
  const [videoWidth, setVideoWidth] = useState("100%")
  const videoStyle = useSpring({
    width: open ? videoWidth : "100%",
    delay: 1000,
  })

  useLayoutEffect(() => {
    function updateSize() {
      const clientWidth = window.innerWidth * 0.9
      const clientHeight = window.innerHeight * 0.8

      let computedWidth = clientWidth
      if (computedWidth * videoRatio > clientHeight) {
        computedWidth = clientHeight / videoRatio
      }

      setVideoWidth(`${(computedWidth / clientWidth) * 100}%`)
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <VideoWrapper>
      <Blob
        complexity={0.7}
        contrast={0.5}
        fill={c.ORANGE}
        seed="Daisy"
        transform="translateX(20vw) scale(1.1)"
        deactivate={open}
        rotate
      >
        <VideoContainer>
          <Video
            playsInline
            muted
            src="https://storage.coverr.co/videos/Fisherman On Duty ?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTY4ODIzNDAzfQ.t6dqJWVL_aCWP1fHK_XtwvGU-KXI7-9jmS5bo34Dyew"
            poster="https://storage.coverr.co/posters/Fisherman On Duty "
            controls={open}
            style={videoStyle}
          />
        </VideoContainer>
      </Blob>
    </VideoWrapper>
  )
}

export default HeroVideo
