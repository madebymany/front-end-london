import React from "react"
import styled, { css } from "styled-components"

import { NavLink, ExternalNavLink } from "../Links"
import { large } from "../../styles/media"
import c from "../../styles/constants"

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

const NavLinks = ({ tickets }) => (
  <Wrapper>
    {tickets && <ExternalNavLink to={tickets}>Get tickets</ExternalNavLink>}
    <NavLink to="/archive/" partiallyActive activeStyle={{ color: c.ORANGE }}>
      Past talks
    </NavLink>
  </Wrapper>
)

export default NavLinks
