import React, { useState } from "react"
import styled, { css } from "styled-components"
import { useSpring, animated } from "react-spring"

import { large } from "../../styles/media"
import Container from "../Container"
import NavLinks from "./NavLinks"
import NavLogo from "./NavLogo"

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

const NavBar = ({ tickets, homepage, toggleMenu, open, ...props }) => {
  // Prevent abuse on menu toggle
  const [toggleDirection, setToggleDirection] = useState(!open)
  const hamburger = useSpring({
    rxy: open ? [45, 12, 10] : [0, 0, 0],
    opacity: open ? 0 : 1,
    top: open ? "M0,10 L24,10" : "M0,3 L24,3",
    bottom: open ? "M0,10 L24,10" : "M0,17 L24,17",
    onRest: () => {
      setToggleDirection(!open)
    },
  })
  return (
    <div {...props}>
      <Container>
        <Wrapper theme={{ homepage, open }}>
          <NavLogo homepage={homepage} open={open} />
          <NavLinks homepage={homepage} tickets={tickets} />
          <Toggle
            type="button"
            onClick={() => toggleMenu(toggleDirection)}
            aria-label={open ? "open menu" : "close menu"}
            aria-expanded={open ? "false" : "true"}
          >
            <svg
              viewBox="0 0 24 20"
              width="24"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              >
                <animated.path
                  d={hamburger.top}
                  transform={hamburger.rxy.to(
                    (r, x, y) => `rotate(-${r} ${x} ${y})`
                  )}
                />
                <animated.path
                  d="M0,10 L24,10"
                  style={{
                    opacity: hamburger.opacity,
                  }}
                />
                <animated.path
                  d={hamburger.bottom}
                  transform={hamburger.rxy.to(
                    (r, x, y) => `rotate(${r} ${x} ${y})`
                  )}
                />
              </g>
            </svg>
          </Toggle>
        </Wrapper>
      </Container>
    </div>
  )
}

export default NavBar
