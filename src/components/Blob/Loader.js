import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import uuid from "uuid/v4"

import Blob from "./Blob"

import c from "../../styles/constants"

const LoaderWrapper = styled.div`
  width: 100%;
  text-align: center;
`

const BlobLoader = ({ text }) => {
  const [id] = useState(uuid())
  return (
    <LoaderWrapper>
      <svg width="250" height="250">
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
            <feComposite in="SourceGraphic" in2={`goo-${id}`} operator="atop" />
          </filter>
        </defs>
        <Blob seed={id} complexity={0.3} contrast={0.4} size={250} run>
          {path => (
            <path d={path} filter={`url(#goo-${id})`} id={id} fill={c.ORANGE} />
          )}
        </Blob>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill={c.WHITE}
        >
          {text}
        </text>
      </svg>
    </LoaderWrapper>
  )
}

BlobLoader.propTypes = {
  text: PropTypes.string,
}

BlobLoader.defaultProps = {
  text: "Loading...",
}

export default BlobLoader
