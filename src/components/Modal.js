import React, { useState, useEffect, useLayoutEffect } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { rgba, cover } from "polished"
import { motion, AnimatePresence } from "framer-motion"
import FocusLock from "react-focus-lock"
import { useMediaQuery } from "react-responsive"
import { disablePageScroll, enablePageScroll } from "scroll-lock"

import c from "../styles/constants"

const ModalWrapper = styled(motion.div)`
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

const Backdrop = styled(motion.div)`
  ${cover()}
  background-color: ${rgba(c.BLACK, 0.55)};
  transition: opacity 0.2s;
`

const directionVariants = {
  left: { closed: { x: "100%" }, open: { x: "0%" } },
  right: { closed: { x: "-100%" }, open: { x: "0%" } },
  down: { closed: { y: "-100%" }, open: { y: "0%" } },
  up: { closed: { y: "100%" }, open: { y: "0%" } },
}

const modalVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
}

export const Modal = ({
  setOpen,
  fullscreen,
  zIndex = 1000,
  align,
  children,
}) => {
  useLayoutEffect(() => {
    disablePageScroll()
    return () => enablePageScroll()
  }, [])

  return ReactDOM.createPortal(
    <ModalWrapper
      variants={modalVariants}
      animate="open"
      exit="closed"
      theme={{ align, fullscreen, zIndex }}
    >
      <Backdrop
        initial="closed"
        variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
        exit="closed"
        transition={{ ease: "linear" }}
        onClick={() => setOpen(false)}
      />
      <FocusLock group="modal">{children}</FocusLock>
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
  direction,
  onClose,
  onEnter,
  ...props
}) => {
  const isDevice = useMediaQuery({ query: `(min-width: ${minWidth}px)` })
  const [active, setActive] = useState(open)
  // Close the Modal view if opened on larger devices
  useEffect(() => {
    if (open && isDevice) {
      setOpen(false)
    }
  }, [isDevice, open, setOpen, active])
  return (
    <AnimatePresence>
      {open ? (
        <Modal
          key="modal"
          setOpen={setOpen}
          onClose={() => setActive(false)}
          {...props}
        >
          <motion.div
            initial="closed"
            exit="closed"
            variants={directionVariants[direction || "left"]}
            transition={{ ease: "linear" }}
            onAnimationComplete={() => {
              //   if (!open) {
              //     setActive(false)
              //     if (onClose) {
              //       onClose()
              //     }
              //   } else {
              //     if (onEnter) {
              //       onEnter()
              //     }
              //   }
            }}
          >
            {children}
          </motion.div>
        </Modal>
      ) : (
        children
      )}
    </AnimatePresence>
  )
}
