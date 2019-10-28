import { Link } from "gatsby"
import styled, { css } from "styled-components"
import { darken } from "polished"
import { medium } from "../styles/media"
import c from "../styles/constants"

const withExternal = Component =>
  styled(Component).attrs(props => ({
    as: "a",
    target: "_blank",
    rel: "noopener norefferer",
    href: props.to,
    ...props,
  }))``

const BaseUnderlineLink = styled(Link)`
  &:before {
    content: "";
    position: absolute;
    background-color: currentColor;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    transition: width 0.2s ease-in-out;
  }

  &:hover,
  &:focus {
    outline: 0;
    &:before {
      width: 100%;
    }
  }
`

export const MonoLink = styled(BaseUnderlineLink)`
  position: relative;
  display: inline-block;
  color: ${c.ORANGE};
  font-family: ${c.FONT_SECONDARY};
  font-size: ${c.LARGE};
  text-decoration: none;
  transition: color 0.15s ease-in-out;

  &:hover,
  &:focus {
    color: ${darken(0.05, c.ORANGE)};
  }

  &:active {
    color: ${darken(0.1, c.ORANGE)};
  }

  ${medium(css`
    font-size: ${c.XL};
  `)}
`

export const ExternalMonoLink = withExternal(MonoLink)

export const MonoArrowLink = styled(MonoLink)`
  &:after {
    content: "  >";
  }
`

export const ExternalMonoArrowLink = withExternal(MonoArrowLink)

export const SimpleLink = styled(Link)`
  display: inline-block;
  color: ${c.BLACK};
  transition: 0.2s color;

  &:focus,
  &:hover {
    outline: 0;
    color: ${c.ORANGE};
  }

  &:focus {
    text-decoration: underline;
  }
`

export const ExternalLink = withExternal(SimpleLink)

export const CopyLink = styled(Link)`
  position: relative;
  display: inline-block;
  color: ${c.ORANGE};
  text-decoration: none;

  &:before {
    content: "";
    position: absolute;
    opacity: 0.5;
    background-color: currentColor;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover,
  &:focus {
    outline: 0;
    &:before {
      opacity: 1;
    }
  }
`

export const ExternalCopyLink = withExternal(CopyLink)

export const MenuLink = styled(Link).attrs(() => ({
  activeStyle: { color: c.ORANGE },
}))`
  position: relative;
  color: ${c.BLACK};
  font-size: ${c.XL4};
  line-height: 1.29;
  transition: color 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: ${c.ORANGE};
  }

  &:focus {
    outline: 0;

    &:before {
      content: "";
      position: absolute;
      opacity: 0.5;
      background-color: currentColor;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      transition: opacity 0.2s ease-in-out;
    }
  }

  &:active {
    color: ${darken(0.1, c.ORANGE)};
  }
`

export const ExternalMenuLink = withExternal(MenuLink)

export const NavLink = styled(Link)`
  position: relative;
  display: inline-block;
  flex: 0 0 auto;
  line-height: 50px;
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;
  color: inherit;
  font-size: ${c.XL2};
  transition: color 1s;

  &:after {
    content: "";
    position: absolute;
    background-color: currentColor;
    width: 0;
    height: 4px;
    bottom: 0;
    left: 0;
  }

  &:hover,
  &:focus,
  &.active {
    outline: 0;
    color: ${props => (props.theme.inverse ? c.WHITE : c.ORANGE)};

    &:after {
      width: 100%;
    }
  }
`

export const ExternalNavLink = withExternal(NavLink)
