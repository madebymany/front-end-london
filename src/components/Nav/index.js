import React, { useState, useEffect, useLayoutEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { motion } from "framer-motion"
import FocusLock from "react-focus-lock"

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
    <FocusLock disabled={!open} group="modal">
      <NavWrapper theme={{ open }}>
        <motion.div initial={false} animate={open ? "open" : "closed"}>
          <NavBar
            tickets={tickets}
            homepage={homepage}
            setOpen={setOpen}
            open={open}
          />
          <NavModal tickets={tickets} open={open} setOpen={setOpen} />
        </motion.div>
      </NavWrapper>
    </FocusLock>
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
