import React from "react"
import styled, { css } from "styled-components"

import { NavLink, ExternalNavLink } from "../Links"
import { large } from "../../styles/media"

const Wrapper = styled.nav`
  display: none;
  z-index: 10;

  ${large(css`
    display: block;
  `)}

  a + a {
    margin-left: 37px;
  }
`

const NavLinks = ({ homepage, tickets }) => (
  <Wrapper>
    {tickets && (
      <ExternalNavLink theme={{ inverse: homepage }} to={tickets}>
        Get tickets
      </ExternalNavLink>
    )}
    <NavLink
      theme={{ inverse: homepage }}
      to="/archive/"
      partiallyActive
      activeClassName="active"
    >
      Past talks
    </NavLink>
  </Wrapper>
)

export default NavLinks
