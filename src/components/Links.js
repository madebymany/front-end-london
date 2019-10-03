import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { medium } from "../styles/media"
import c from "../styles/constants"

export const MonoLink = styled(Link)`
  display: inline-block;
  color: ${c.ORANGE};
  font-family: ${c.FONT_SECONDARY};
  font-size: ${c.LARGE};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  ${medium(css`
    font-size: ${c.XL};
  `)}
`

export const ExternalMonoLink = props => (
  <MonoLink as="a" target="_blank" rel="noopener" {...props} />
)

export const MonoArrowLink = styled(MonoLink)`
  &:after {
    content: "  >";
  }
`

export const ExternalMonoArrowLink = props => (
  <MonoArrowLink as="a" target="_blank" rel="noopener" {...props} />
)

export const SimpleLink = styled(Link)`
  display: inline-block;
  color: ${c.BLACK};
  transition: 0.2s color;

  &:hover {
    color: ${c.ORANGE};
  }
`

export const ExternalLink = props => (
  <SimpleLink as="a" target="_blank" rel="noopener" {...props} />
)

export const CopyLink = styled(Link)`
  display: inline-block;
  color: ${c.ORANGE};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const ExternalCopyLink = props => (
  <CopyLink as="a" target="_blank" rel="noopener" {...props} />
)

export const MenuLink = styled(Link)`
  color: ${c.BLACK};
  font-size: ${c.XL4};
  line-height: 1.29;
`

export const ExternalMenuLink = props => (
  <MenuLink as="a" target="_blank" rel="noopener" {...props} />
)
