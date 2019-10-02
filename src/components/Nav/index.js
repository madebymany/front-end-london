import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import NavBar from "./NavBar"

const NavWrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 100;
`

const Nav = ({ tickets, homepage }) => {
  return (
    <NavWrapper>
      <NavBar tickets={tickets} homepage={homepage} />
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
