import React, { useState, useEffect, useLayoutEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import NavBar from "./NavBar"
import NavModal from "../NavModal"

const NavWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 1000;
`

const Nav = ({ tickets, homepage, location }) => {
  const [open, setOpen] = useState(false)

  // Whenever pathname changes close the nav
  useEffect(() => {
    setOpen(false)
  }, [location])

  useLayoutEffect(() => {
    document.body.classList[open ? "add" : "remove"]("nav--open")
  }, [open])

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
