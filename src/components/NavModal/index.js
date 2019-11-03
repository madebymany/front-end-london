import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
  transform,
} from "framer-motion"
import { setTimeout, clearTimeout } from "requestanimationframe-timer"
import { interpolate } from "polymorph-js"
import debounce from "lodash.debounce"

import { Modal } from "../Modal"
import MobileMenu from "./MobileMenu"
import c from "../../styles/constants"

const MenuWrapper = styled.div`
  height: 100%;
  overflow: auto;
`

const OuterWrapper = styled(motion.div)`
  position: relative;
  height: 100%;
  padding-top: ${c.XL8};
  z-index: 1;

  @media (max-height: 400px) {
    padding-top: ${c.XL7};
    nav > div {
      margin-bottom: 0;
    }
  }
`

const MorphSvg = styled(motion.svg)`
  position: absolute;
  width: 120%;
  height: 110%;
  top: -5%;
  left: 130%;
  fill: ${c.WHITE};
`

const startPath =
  "M574.3-36.1c0,0-554.7-140.5-547.7,46.1s523.2,94.9,522,258.1c-1.2,163.1-276,298.8,25.8,354.9"
const endPath =
  "M574.9-36.1c0,0-514.3-75-543.8,36.1c-46.7,175.6-20.9,497.5,13.7,563.5C76.6,624,422.8,611.3,574.9,623"

const interpolator = interpolate([startPath, endPath], {
  addPoints: 0,
  origin: { x: 0, y: 0 },
  optimize: "fill",
  precision: 0,
})

const springConfig = { damping: 300, stiffness: 100, mass: 2 }

const MobileModal = ({ tickets, open, setOpen }) => {
  const [size, setSize] = useState("100%")
  const pathPos = useSpring(0, { springConfig })
  const path = useTransform(pathPos, value =>
    interpolator(transform(value, [0, 1], [0, 1]))
  )
  useEffect(() => {
    const timer = setTimeout(
      () => {
        pathPos.set(open ? 1 : 0)
      },
      open ? 400 : 500
    )

    return () => clearTimeout(timer)
  }, [open, pathPos])

  useEffect(() => {
    const getSize = debounce(() => {
      setSize(window.innerHeight)
    }, 300)
    getSize()
    window.addEventListener("resize", getSize)
    return () => window.removeEventListener("resize", getSize)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <Modal open={open} zIndex={10} fullscreen>
          <MenuWrapper style={{ height: size }}>
            <MorphSvg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 566.9 566.9"
              preserveAspectRatio="none"
              initial="closed"
              exit="closed"
              variants={{
                closed: { x: "0%", transition: { delay: 0.6, duration: 0.6 } },
                open: { x: "-120%", transition: { duration: 0.6 } },
              }}
              transition={{
                type: "spring",
                ...springConfig,
              }}
            >
              <motion.path d={path} />
            </MorphSvg>
            <OuterWrapper
              initial="closed"
              variants={{
                closed: {
                  x: "60%",
                  opacity: 0,
                  transition: { duration: 0.6 },
                },
                open: {
                  x: "0%",
                  opacity: 1,
                  transition: { delay: 0.6, duration: 0.6 },
                },
              }}
              exit="closed"
            >
              <MobileMenu tickets={tickets} onClick={() => setOpen(false)} />
            </OuterWrapper>
          </MenuWrapper>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default MobileModal
