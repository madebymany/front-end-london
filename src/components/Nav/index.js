import React, { useState } from "react"
import PropTypes from "prop-types"
import { useTransition, config } from "react-spring"
import styled from "styled-components"

import NavBar from "./NavBar"
import MobileMenu from "../MobileMenu"

const NavWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 100;
`

const Nav = ({ tickets, homepage }) => {
  const [toggle, setToggle] = useState(false)
  const transitions = useTransition(toggle, null, {
    from: { left: "-100%" },
    enter: { left: "0%" },
    leave: { left: "-100%" },
  })
  return (
    <NavWrapper>
      <NavBar
        tickets={tickets}
        homepage={homepage}
        toggleMenu={setToggle}
        open
      />
      {transitions.map(
        ({ item, key, props }) =>
          item && <MobileMenu key={key} style={props} toggleMenu={setToggle} />
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
