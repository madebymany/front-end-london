import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useTransition } from "react-spring"
import styled from "styled-components"
import { disablePageScroll, enablePageScroll } from "scroll-lock"

import NavBar from "./NavBar"
import MobileMenu from "../MobileMenu"

const NavWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 100;
`

const Nav = ({ tickets, homepage, pathname }) => {
  const [open, setOpen] = useState(false)
  const transitions = useTransition(open, null, {
    from: { left: "-100%" },
    enter: { left: "0%" },
    leave: { left: "-100%" },
  })

  // Whenever pathname changes close the nav
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      disablePageScroll()
    } else {
      enablePageScroll()
    }
  }, [open])
  return (
    <NavWrapper>
      <NavBar tickets={tickets} homepage={homepage} toggleMenu={setOpen} open />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <MobileMenu
              key={key}
              style={props}
              tickets={tickets}
              toggleMenu={setOpen}
            />
          )
      )}
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
