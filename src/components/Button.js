import React from "react"
import styled, { css } from "styled-components"
import { darken, lighten, rgba } from "polished"
import { Link } from "gatsby"

import { medium } from "../styles/media"
import c from "../styles/constants"

const Base = styled.button`
  box-sizing: border-box;
  color: ${c.WHITE};
  background-color: ${props => (props.primary ? c.ORANGE : c.JET_BLACK)};
  text-align: center;
  text-decoration: none;
  appearance: none;
  user-select: none;
  border: none;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:focus,
  &:hover {
    background-color: ${props =>
      props.primary ? darken(0.05, c.ORANGE) : lighten(0.1, c.JET_BLACK)};
  }

  &:active {
    background-color: ${props =>
      props.primary ? darken(0.1, c.ORANGE) : lighten(0.2, c.JET_BLACK)};
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem
      ${props => rgba(props.primary ? c.ORANGE : c.JET_BLACK, 0.4)};
  }
`

export const Button = styled(Base)`
  display: ${props => (props.block ? "block" : "inline-block")};
  ${props => props.block && "width: 100%;"};
  vertical-align: middle;
  font-family: ${c.FONT_SECONDARY};
  font-weight: ${c.MEDIUM};
  font-size: ${c.LARGE};
  line-height: 1.3;
  padding: ${c.XL} ${c.XL5};
  min-height: 64px;

  ${medium(css`
    font-size: ${c.XL2};
    line-height: 1;
    ${props => !props.block && "min-width: 218px"};
  `)}
`

export const IconButton = styled(Base)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${c.BASE};
`

export const InternalLinkButton = props => <Button as={Link} {...props} />

export const ExternalLinkButton = props => <Button as="a" {...props} />
