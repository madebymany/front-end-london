import React, { useState } from "react"
import Measure from "react-measure"
import { useInView } from "react-intersection-observer"
import styled, { keyframes } from "styled-components"

import Wave from "./Wave"

const offset = props => keyframes`
  from {
    transform: translateY(0);
  }
  to  {
    transform: translateY(100px);
  }
`

const OffsetPath = styled.path`
  transform-origin: 50% 50%;
  transform-box: fill-box;
  animation: ${offset} 15s ease-in-out infinite alternate;
`

const Wrapper = styled.div`
  position: relative;
`

const ExpandedWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const WaveContainer = ({ fill, children, ...props }) => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [ref, inView] = useInView({ threshold: 0 })
  return (
    <Measure bounds onResize={({ bounds }) => setSize(bounds)}>
      {({ measureRef }) => (
        <Wrapper ref={measureRef}>
          <ExpandedWrapper>
            <svg ref={ref} width="100%" height="100%" {...props}>
              <Wave size={size} run={inView}>
                {path => <OffsetPath fill={fill} d={path} />}
              </Wave>
            </svg>
          </ExpandedWrapper>
          {children}
        </Wrapper>
      )}
    </Measure>
  )
}

export default WaveContainer
