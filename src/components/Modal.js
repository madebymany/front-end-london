import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { rgba, cover } from "polished"
import { Spring, animated } from "react-spring"
import FocusLock from "react-focus-lock"
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
  z-index: ${props => props.theme.zIndex};
  ${props => props.theme.align && `justify-content: ${props.theme.align};`}

  [data-focus-lock="modal"] {
    outline: 0;
    z-index: 1;

    ${props =>
      props.theme.fullscreen &&
      `
        height: 100%;

        > div {
          height: 100%;
        }
      `}
  }
`

const Backdrop = styled.div`
  ${cover()}
  background-color: ${rgba(c.BLACK, 0)};
  transition: background-color 0.5s, opacity 0.2s;

  ${props =>
    props.theme.open &&
    `
    background-color: ${rgba(c.BLACK, 0.55)};
    `}
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
  onEnter,
  direction,
  fullscreen,
  zIndex = 1000,
  align,
  children,
}) => {
  const ref = useRef(null)
  const [active, setActive] = useState(open)
  // Enable/Disable scroll when opened
  useLayoutEffect(() => {
    if (open) {
      disablePageScroll()
    } else {
      enablePageScroll()
    }
  }, [open])
  return ReactDOM.createPortal(
    <ModalWrapper theme={{ align, fullscreen, zIndex }}>
      <Backdrop theme={{ open: active }} onClick={() => setOpen(false)} />
      <FocusLock group="modal">
        <Spring
          from={{ x: 0 }}
          to={{ x: 1 }}
          {...directions[direction]}
          reverse={!open}
          reset={!open}
          onRest={() => {
            if (!open) {
              setActive(false)
              if (onClose) {
                onClose()
              }
            } else {
              if (onEnter) {
                onEnter()
              }
            }
          }}
        >
          {props => (
            <animated.div ref={ref} style={props}>
              {children}
            </animated.div>
          )}
        </Spring>
      </FocusLock>
    </ModalWrapper>,
    document.body
  )
}

// A mobile only modal that will output the children normally (in page flow) when on larger devices
export const MobileModal = ({
  open,
  setOpen,
  minWidth = 768,
  children,
  ...props
}) => {
  const isDevice = useMediaQuery({ query: `(min-width: ${minWidth}px)` })
  const [active, setActive] = useState(open)
  // Close the Modal view if opened on larger devices
  useEffect(() => {
    if (open && !isDevice) {
      setActive(true)
    }

    if (active && isDevice) {
      setOpen(false)
    }
  }, [isDevice, open, setOpen, active])
  return (
    <>
      {active ? (
        <Modal
          open={open}
          setOpen={setOpen}
          onClose={() => setActive(false)}
          {...props}
        >
          {children}
        </Modal>
      ) : (
        children
      )}
    </>
  )
}
