import React from "react"
import styled, { css } from "styled-components"

import { large } from "../../styles/media"
import Container from "../Container"
import NavLinks from "./NavLinks"
import NavLogo from "./NavLogo"
import NavToggle from "./NavToggle"

import c from "../../styles/constants"

const Wrapper = styled.header`
  width: 100%;
  height: ${c.HEADER};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: bold;
  padding-top: 8px;
  color: ${props =>
    props.theme.homepage && !props.theme.open ? c.WHITE : c.BLACK};
  transition: color 0.2s ease-in-out;

  ${large(css`
    padding-top: ${c.XL2};
  `)};

  .hero--open & {
    color: ${c.BLACK};
  }
`

const NavBar = ({ tickets, homepage, setOpen, open, ...props }) => (
  <div {...props}>
    <Container>
      <Wrapper theme={{ homepage, open }}>
        <NavLogo homepage={homepage} />
        <NavLinks homepage={homepage} tickets={tickets} />
        <NavToggle
          onClick={() => setOpen(!open)}
          aria-label={open ? "open menu" : "close menu"}
          aria-expanded={open ? "false" : "true"}
        />
      </Wrapper>
    </Container>
  </div>
)

export default NavBar
