import React, { useState } from "react"
import PropTypes from "prop-types"
import Measure from "react-measure"
import { animated } from "react-spring"
import { useInView } from "react-intersection-observer"
import styled, { css, keyframes } from "styled-components"
import uuid from "uuid/v4"
import debounce from "lodash.debounce"

import Blob from "./Blob"

const rotateAnimation = props => keyframes`
  from {
  transform: ${props.transform || ""} rotate(0deg);
  }
  to  {
    transform: ${props.transform || ""} rotate(360deg);
  }
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

const Rotating = styled.g`
  transform-origin: 50% 50%;
  transform-box: fill-box;
  ${props =>
    props.run &&
    css`
      animation: ${rotateAnimation} 90s linear infinite;
    `}
`

const Path = styled(animated.path)`
  transform-origin: 50% 50%;
  transform-box: fill-box;
`

const BlobContainer = ({
  complexity,
  contrast,
  fill,
  rotate,
  transform,
  children,
  ...props
}) => {
  const [id] = useState(uuid())
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [ref, inView] = useInView({ threshold: 0 })
  const offset = (size.width - size.height) / 2
  return (
    <Measure bounds onResize={debounce(({ bounds }) => setSize(bounds), 100)}>
      {({ measureRef }) => (
        <Wrapper ref={measureRef}>
          {children}
          <ExpandedWrapper>
            <svg ref={ref} width="100%" height="100%" {...props}>
              <defs>
                <filter id={`goo-${id}`}>
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result={`goo-${id}`}
                  />
                  <feBlend in="SourceGraphic" in2={`goo-${id}`} />
                  <feComposite
                    in="SourceGraphic"
                    in2={`goo-${id}`}
                    operator="atop"
                  />
                </filter>
                <mask id={`window-${id}`}>
                  <rect x="0" y="0" fill="#fff" width="100%" height="100%" />
                  <Rotating fill="#000" run={rotate}>
                    <g style={{ transform: `translateX(${offset}px)` }}>
                      <Blob
                        seed={id}
                        complexity={complexity}
                        contrast={contrast}
                        size={size.height}
                        run={inView}
                      >
                        {path => (
                          <Path
                            d={path}
                            filter={`url(#goo-${id})`}
                            id={id}
                            style={{ transform }}
                          />
                        )}
                      </Blob>
                    </g>
                  </Rotating>
                </mask>
              </defs>
              <rect
                x="0"
                y="0"
                fill={fill}
                width="100%"
                height="100%"
                mask={`url(#window-${id})`}
              />
            </svg>
          </ExpandedWrapper>
        </Wrapper>
      )}
    </Measure>
  )
}

BlobContainer.propTypes = {
  children: PropTypes.node.isRequired,
  complexity: PropTypes.number.isRequired,
  contrast: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
  rotate: PropTypes.bool,
  transform: PropTypes.string,
}

BlobContainer.defaultProps = {
  rotate: false,
  transform: "",
}

export default BlobContainer
