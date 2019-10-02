import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import { large } from "../../styles/media"
import c from "../../styles/constants"

const Wrapper = styled.nav`
  display: none;
  z-index: 10;

  ${large(css`
    display: block;
  `)}
`

const NavLink = styled(Link)`
  flex: 0 0 auto;
  display: inline-block;
  line-height: 50px;
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;
  color: currentColor;
  font-size: ${c.XL2};

  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }

  & + & {
    margin-left: 37px;
  }
`

const NavLinks = ({ tickets }) => (
  <Wrapper>
    {tickets && (
      <NavLink as="a" to={tickets}>
        Get tickets
      </NavLink>
    )}
    <NavLink to="/archive">Past talks</NavLink>
  </Wrapper>
)

export default NavLinks
