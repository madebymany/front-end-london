import React from "react"
import { useSpring, animated } from "react-spring"
import { AnimatedLink } from "../Links"
import Logo from "../../../assets/images/logo.svg"

const NavLogo = () => {
  const opacity = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 700,
  })
  return (
    <animated.div style={opacity}>
      <AnimatedLink to="/">
        <img src={Logo} alt="Frontend London" />
      </AnimatedLink>
    </animated.div>
  )
}

export default NavLogo
