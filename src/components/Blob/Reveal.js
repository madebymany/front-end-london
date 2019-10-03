import React, { useState } from "react"
import PropTypes from "prop-types"
import Measure from "react-measure"
import { animated, config } from "react-spring"
import { Spring } from "react-spring/renderprops"
import styled from "styled-components"
import uuid from "uuid/v4"
import debounce from "lodash.debounce"

import Blob from "./Blob"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const ExpandedWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`

const Path = styled(animated.path)`
  transform-origin: 50% 50%;
  transform-box: fill-box;
`

const BlobContainer = ({
  id,
  seed,
  complexity,
  contrast,
  children,
  open,
  onRest,
  ...props
}) => {
  const [uid] = useState(uuid())
  const [size, setSize] = useState({ width: 0, height: 0 })

  const scaleHeight = size.width > size.height ? size.width : size.height
  return (
    <Measure bounds onResize={debounce(({ bounds }) => setSize(bounds), 100)}>
      {({ measureRef }) => (
        <Wrapper ref={measureRef} {...props}>
          <ExpandedWrapper>
            <svg width="0" height="0">
              <defs>
                <filter id={`goo-${uid}`}>
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result={`goo-${uid}`}
                  />
                  <feBlend in="SourceGraphic" in2={`goo-${uid}`} />
                  <feComposite
                    in="SourceGraphic"
                    in2={`goo-${uid}`}
                    operator="atop"
                  />
                </filter>
                <clipPath id={id}>
                  {size.width >= 0 && (
                    <Spring
                      from={{
                        width: 100,
                        height: 100,
                      }}
                      to={{
                        width: open ? size.width * 3 : 100,
                        height: open ? scaleHeight * 3 : 100,
                      }}
                      config={{
                        ...config.default,
                        duration: 1000,
                      }}
                      onRest={onRest}
                    >
                      {({ width, height }) => (
                        <Blob
                          seed={seed}
                          complexity={complexity}
                          contrast={contrast}
                          size={height}
                        >
                          {path => (
                            <Path
                              d={path}
                              filter={`url(#goo-${uid})`}
                              id={uid}
                              style={{
                                transform: `translate(-${width /
                                  3}px, -${height / 3}px)`,
                              }}
                            />
                          )}
                        </Blob>
                      )}
                    </Spring>
                  )}
                </clipPath>
              </defs>
            </svg>
          </ExpandedWrapper>
          {children}
        </Wrapper>
      )}
    </Measure>
  )
}

BlobContainer.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  complexity: PropTypes.number.isRequired,
  contrast: PropTypes.number.isRequired,
}

export default BlobContainer
