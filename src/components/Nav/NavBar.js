import React from "react"
import styled, { css } from "styled-components"

import { large } from "../../styles/media"
import Container from "../Container"
import NavLinks from "./NavLinks"
import NavLogo from "./NavLogo"

import c from "../../styles/constants"

const Wrapper = styled.header`
  width: 100%;
  height: ${c.HEADER};
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
  color: currentColor;
  background: transparent;
  border: none;
  padding: 0;
  margin-top: 10px;

  ${large(css`
    display: none;
  `)}
`

const NavBar = ({ tickets, homepage, toggleMenu, open, ...props }) => (
  <div {...props}>
    <Container>
      <Wrapper homepage={homepage}>
        {!homepage && <NavLogo />}
        <NavLinks tickets={tickets} />
        <Toggle
          type="button"
          onClick={() => toggleMenu(open)}
          aria-label={open ? "open menu" : "close menu"}
          aria-expanded={open ? "false" : "true"}
        >
          {open ? (
            <svg width="24" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 1h24M0 8h24M0 15h24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          ) : (
            <svg width="18" height="19" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.547.906l1.414 1.415-7.547 7.546.02.02-.016.014L18 17.485 16.586 18.9 9 11.312 1.414 18.9 0 17.485l7.581-7.584-.014-.014.018-.02L.039 2.321 1.453.906 9 8.453 16.547.906z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          )}
        </Toggle>
      </Wrapper>
    </Container>
  </div>
)

export default NavBar
