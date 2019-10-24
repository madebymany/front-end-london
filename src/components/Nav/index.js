import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import NavBar from "./NavBar"
import NavModal from "../NavModal"

import c from "../../styles/constants"

const NavWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 1000;
  opacity: 1;
  background-color: ${props => (props.theme.open ? c.WHITE : "transparent")};
  transition: opacity 0.3s, visibility 0.3s,
    background-color 0.3s ${props => props.theme.open && "0.7s"};

  .hero--open & {
    opacity: 0;
    visibility: hidden;
  }
`

const Nav = ({ tickets, homepage, pathname }) => {
  const [open, setOpen] = useState(false)

  // Whenever pathname changes close the nav
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <NavWrapper theme={{ open }}>
      <NavBar
        tickets={tickets}
        homepage={homepage}
        toggleMenu={setOpen}
        open={open}
      />
      <NavModal tickets={tickets} open={open} />
    </NavWrapper>
  )
}

Nav.propTypes = {
  logo: PropTypes.bool,
  color: PropTypes.bool,
}

Nav.defaultProps = {
  logo: true,
  color: false,
}

export default Nav
