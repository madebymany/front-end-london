import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Logo from "../../../assets/images/logo.svg"

const LogoWrapper = styled.div`
  opacity: ${props => (props.theme.visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  .hero--open & {
    opacity: 1;
    transition: opacity 0.3s 1s ease-in-out;
  }
`

const NavLogo = ({ open, homepage }) => (
  <LogoWrapper theme={{ visible: !homepage || open }}>
    <Link to="/">
      <img src={Logo} alt="Frontend London" />
    </Link>
  </LogoWrapper>
)

export default NavLogo
