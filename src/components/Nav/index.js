import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import NavBar from "./NavBar"
import NavModal from "../NavModal"

const NavWrapper = styled.div`
  position: ${({ open }) => (open ? "fixed" : "absolute")};
  width: 100%;
  top: 0;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.3s, visibility 0.3s;

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
    <NavWrapper>
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
