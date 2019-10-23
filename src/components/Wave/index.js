import React from "react"
import { useSpring, animated } from "react-spring"
import { useInView } from "react-intersection-observer"
import styled, { keyframes } from "styled-components"

const offset = props => keyframes`
  from {
    transform: translateY(0);
  }
  to  {
    transform: translateY(20%);
  }
`

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const WaveGroup = styled.g`
  transform-origin: center;
  animation: ${offset} 15s ease-in-out infinite alternate;
`

const ExpandedWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const wavePaths = [
  "M0,224L48,186.7C96,149,192,75,288,53.3C384,32,480,64,576,112C672,160,768,224,864,229.3C960,235,1056,181,1152,149.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
  "M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,256C672,288,768,288,864,256C960,224,1056,160,1152,128C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
  "M0,96L48,122.7C96,149,192,203,288,229.3C384,256,480,256,576,224C672,192,768,128,864,90.7C960,53,1056,43,1152,69.3C1248,96,1344,160,1392,192L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
  "M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,229.3C672,256,768,288,864,282.7C960,277,1056,235,1152,234.7C1248,235,1344,277,1392,298.7L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
  "M0,128L48,138.7C96,149,192,171,288,197.3C384,224,480,256,576,250.7C672,245,768,203,864,160C960,117,1056,75,1152,58.7C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
]

const getRandomWaves = () =>
  wavePaths
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])

const WaveContainer = ({ fill, children, ...props }) => {
  let waves = getRandomWaves()
  const [ref, inView] = useInView({ threshold: 0 })
  const wave = useSpring({
    cancel: !inView,
    from: {
      d: waves[0],
    },
    to: async next => {
      while (true) {
        await next({
          d: waves.pop(),
          config: {
            duration: 10000,
            easing: t => (1 - Math.cos(Math.PI * t)) / 2,
          },
        })

        if (!waves.length) {
          waves = getRandomWaves()
        }
      }
    },
  })
  return (
    <Wrapper ref={ref}>
      <ExpandedWrapper>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <WaveGroup>
            <animated.path
              d={wave.d}
              transform="translate(-220 0)"
              fill={fill}
            />
          </WaveGroup>
        </svg>
      </ExpandedWrapper>
      {children}
    </Wrapper>
  )
}

export default WaveContainer
