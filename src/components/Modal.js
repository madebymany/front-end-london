import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { rgba, cover } from "polished"
import { Spring } from "react-spring/renderprops"
import { animated } from "react-spring"
import FocusTrap from "react-focus-trap"
import { useMediaQuery } from "react-responsive"
import { disablePageScroll, enablePageScroll } from "scroll-lock"

import c from "../styles/constants"

const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${rgba(c.BLACK, 0)};
  visibility: hidden;
  opacity: 0;
  transition: background-color 0.2s, opacity 0.2s;

  ${props =>
    props.open &&
    `
    background-color: ${rgba(c.BLACK, 0.55)};
    `}
  ${props =>
    props.animating &&
    `
    opacity: 1;
    visibility: visible;
    z-index: 100;
  `}

  .focus-trap-wrapper {
    display: flex;
    flex-direction: column;
    z-index: 1;
    ${props => props.align && `justify-content: ${props.align};`}
    width: 100%;
    height: 100%;

    .focus-trap-backdrop {
      ${cover()}
    }

    .focus-trap {
      outline: 0;
      z-index: 1;
    }
  }
`

const directions = {
  down: {
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0%)" },
  },
  up: {
    from: { transform: "translateY(100%)" },
    to: { transform: "translateY(0%)" },
  },
}

export const Modal = ({
  open,
  setOpen,
  onClose,
  direction,
  align,
  children,
}) => {
  // Allow the Modal to animate in and out based on `open`
  const [isAnimating, setAnimating] = useState(open)

  // Enable/Disable scroll when opened
  useEffect(() => {
    if (open) {
      setAnimating(true)
      disablePageScroll()
    } else {
      enablePageScroll()
    }
  }, [open])

  return ReactDOM.createPortal(
    <ModalWrapper open={open} animating={isAnimating} align={align}>
      {isAnimating && (
        <FocusTrap
          onExit={() => {
            setOpen(false)
          }}
        >
          <Spring
            {...directions[direction]}
            reverse={!open}
            reset={!open}
            onRest={() => {
              if (!open) {
                setAnimating(false)
                if (onClose) {
                  onClose(false)
                }
              }
            }}
          >
            {props => <animated.div style={props}>{children}</animated.div>}
          </Spring>
        </FocusTrap>
      )}
    </ModalWrapper>,
    document.body
  )
}

// A mobile only modal that will output the children normally (in page flow) when on larger devices
export const MobileModal = ({ open, setOpen, children, ...props }) => {
  const isMedium = useMediaQuery({ query: `(min-width: 768px)` })
  const [active, setActive] = useState(open)
  // Close the Modal view if opened on larger devices with mobileONly
  useEffect(() => {
    if (open) {
      setActive(true)
    }

    if (open && isMedium) {
      setOpen(false)
    }
  }, [isMedium, open, setOpen])
  return (
    <>
      {active ? (
        <Modal open={open} setOpen={setOpen} onClose={setActive} {...props}>
          {children}
        </Modal>
      ) : (
        children
      )}
    </>
  )
}
