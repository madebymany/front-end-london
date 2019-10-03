import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"

import { medium } from "../styles/media"
import c from "../styles/constants"

export const Button = styled.button`
  display: ${props => (props.block ? "block" : "inline-block")};
  ${props => props.block && "width: 100%;"};
  box-sizing: border-box;
  color: ${c.WHITE};
  background-color: ${props => (props.primary ? c.ORANGE : c.BLACK)};
  text-align: center;
  vertical-align: middle;
  font-family: ${c.FONT_SECONDARY};
  font-weight: ${c.MEDIUM};
  font-size: ${c.LARGE};
  line-height: 1.3;
  padding: ${c.XL} ${c.XL5};
  min-height: 64px;
  text-decoration: none;
  appearance: none;
  user-select: none;
  border: none;
  cursor: pointer;

  ${medium(css`
    font-size: ${c.XL2};
    line-height: 1;
    ${props => !props.block && "min-width: 218px"};
  `)}
`

export const InternalLinkButton = props => <Button as={Link} {...props} />

export const ExternalLinkButton = props => <Button as="a" {...props} />
