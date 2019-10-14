import React from "react"

import { AnimatedLink } from "../Links"
import Logo from "../../../assets/images/logo.svg"

const NavLogo = () => (
  <div>
    <AnimatedLink to="/">
      <img src={Logo} alt="Frontend London" />
    </AnimatedLink>
  </div>
)

export default NavLogo
