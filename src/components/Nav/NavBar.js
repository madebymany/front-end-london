import React from "react"
import styled, { css } from "styled-components"

import { medium, large } from "../../styles/media"
import c from "../../styles/constants"
import Container from "../Container"
import NavLinks from "./NavLinks"
import NavLogo from "./NavLogo"

const NavContainer = styled.div``

const Wrapper = styled.header`
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: ${props => (!props.homepage ? "row" : "row-reverse")};
  justify-content: space-between;
  font-weight: bold;
  padding-top: 8px;
  color: ${props => (props.homepage ? c.WHITE : c.BLACK)};
  ${large(css`
    padding-top: ${c.XL2};
  `)};
`

const Toggle = styled.button`
  display: flex;
  justify-content: center;
  width: 34px;
  height: 34px;
  color: ${c.WHITE};
  background: transparent;
  border: none;
  padding: 0;
  margin-top: 10px;

  ${large(css`
    display: none;
  `)}
`

const NavBar = ({ tickets, homepage }) => (
  <NavContainer homepage={homepage}>
    <Container>
      <Wrapper homepage={homepage}>
        {!homepage && <NavLogo />}
        <NavLinks tickets={tickets} />
        <Toggle type="button">
          <svg
            width="24"
            height="16"
            viewBox="0 0 24 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            >
              <path d="M0,1 L24,1"></path>
              <path d="M0,8 L24,8"></path>
              <path d="M0,15 L24,15"></path>
            </g>
          </svg>
        </Toggle>
      </Wrapper>
    </Container>
  </NavContainer>
)

export default NavBar
