import React from "react"
import styled from "styled-components"
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

const Video = styled.video`
  max-width: 100%;
  ${cover()}
`

const HeroVideo = () => (
  <VideoWrapper>
    <Blob
      complexity={0.7}
      contrast={0.5}
      fill={c.ORANGE}
      seed="Daisy"
      transform="translateX(20vw) scale(1.1)"
      rotate
    >
      <VideoContainer>
        <Video
          playsInline
          muted
          src="https://storage.coverr.co/videos/Fisherman On Duty ?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTY4ODIzNDAzfQ.t6dqJWVL_aCWP1fHK_XtwvGU-KXI7-9jmS5bo34Dyew"
          poster="https://storage.coverr.co/posters/Fisherman On Duty "
        />
      </VideoContainer>
    </Blob>
  </VideoWrapper>
)

export default HeroVideo
