import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

import { small, medium, large, xlarge } from "../styles/media"

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${props => props.justify && `justify-content: ${props.justify};`}
  ${props => props.align && `align-items: ${props.align};`}
`

Row.propTypes = {
  justify: PropTypes.string,
  align: PropTypes.string,
}

Row.defaultProps = {
  justify: null,
  align: null,
}

const generateWidth = width =>
  css`
    width: ${width * 100}%;
  `

const ColumnWrapper = styled.div`
  ${props => css`
    ${generateWidth(props.xs)}
    ${props.sm && small(generateWidth(props.sm))}
    ${props.md && medium(generateWidth(props.md))}
    ${props.lg && large(generateWidth(props.lg))}
    ${props.xl && xlarge(generateWidth(props.xl))}
  `}
`

export const Column = props => <ColumnWrapper {...props} />

Column.propTypes = {
  xs: PropTypes.number.isRequired,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
}

Column.defaultProps = {
  xs: 1,
  md: null,
  lg: null,
  xl: null,
}
