import styled, { css } from "styled-components"
import TransitionLink from "gatsby-plugin-transition-link"
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

export const AnimatedLink = styled(TransitionLink).attrs(() => ({
  entry: { length: 2, appearAfter: 0.5 },
  exit: { length: 2 },
}))``

export const MonoLink = styled(AnimatedLink)`
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

export const ExternalMonoLink = withExternal(MonoLink)

export const MonoArrowLink = styled(MonoLink)`
  &:after {
    content: "  >";
  }
`

export const ExternalMonoArrowLink = withExternal(MonoArrowLink)

export const SimpleLink = styled(AnimatedLink)`
  display: inline-block;
  color: ${c.BLACK};
  transition: 0.2s color;

  &:hover {
    color: ${c.ORANGE};
  }
`

export const ExternalLink = withExternal(SimpleLink)

export const CopyLink = styled(AnimatedLink)`
  display: inline-block;
  color: ${c.ORANGE};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const ExternalCopyLink = withExternal(CopyLink)

export const MenuLink = styled(AnimatedLink)`
  color: ${c.BLACK};
  font-size: ${c.XL4};
  line-height: 1.29;
`

export const ExternalMenuLink = withExternal(MenuLink)

export const NavLink = styled(AnimatedLink)`
  flex: 0 0 auto;
  display: inline-block;
  line-height: 50px;
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;
  color: currentColor;
  font-size: ${c.XL2};

  transition: color 1s;

  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`

export const ExternalNavLink = withExternal(NavLink)
