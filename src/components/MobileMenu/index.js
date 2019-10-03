import React, { useState } from "react"
import styled from "styled-components"
import { animated } from "react-spring"
import { isEdge } from "react-device-detect"

import BlobReveal from "../Blob/Reveal"
import Menu from "./MobileMenu"

const MenuWrapper = styled(animated.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const Inner = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  clip-path: url(#reveal);
`

const MobileMenu = ({ style, toggleMenu }) => {
  const [open, setOpen] = useState(true)
  const toggleOpen = state => {
    setOpen(state)
    // Edge doesn't support svg clip-path on HTML Elements.
    // So we don't want to delay the closing of the menu.
    // Modernizr can't detect for it https://github.com/Modernizr/Modernizr/issues/213
    if (isEdge) {
      toggleMenu(state)
    }
  }
  return (
    <MenuWrapper style={style}>
      <BlobReveal
        id="reveal"
        seed="Lily"
        complexity={0.3}
        contrast={0.3}
        open={open}
        onRest={() => !open && !isEdge && toggleMenu(false)}
      >
        <Inner>
          <Menu toggleMenu={toggleOpen} />
        </Inner>
      </BlobReveal>
    </MenuWrapper>
  )
}

export default MobileMenu
