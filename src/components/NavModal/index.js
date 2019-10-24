import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useSpring, useTransition, useChain, animated } from "react-spring"
import { interpolate } from "polymorph-js"
import debounce from "lodash.debounce"

import { Modal } from "../Modal"
import MobileMenu from "./MobileMenu"
import c from "../../styles/constants"

const MenuWrapper = styled(animated.div)`
  height: 100%;
  overflow: auto;
`

const OuterWrapper = styled(animated.div)`
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

const MorphSvg = styled(animated.svg)`
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

const MobileModal = ({ tickets, open }) => {
  const [size, setSize] = useState("100%")

  useEffect(() => {
    const getSize = debounce(() => {
      setSize(window.innerHeight)
    }, 300)
    getSize()
    window.addEventListener("resize", getSize)
    return () => window.removeEventListener("resize", getSize)
  }, [])

  const fadeRef = useRef()
  const fade = useSpring({
    to: {
      transform: open ? "translateX(0%)" : "translateX(60%)",
      opacity: open ? 1 : 0,
    },
    ref: fadeRef,
  })
  const blobRef = useRef()
  const blob = useTransition(open, null, {
    from: {
      d: 0,
      x: 0,
      state: "open",
    },
    enter: {
      d: 1,
      x: -120,
      state: "open",
    },
    leave: {
      d: 0,
      x: 0,
      state: "closed",
    },
    config: {
      duration: 600,
    },
    ref: blobRef,
  })

  useChain(open ? [blobRef, fadeRef] : [fadeRef, blobRef], [0, 0.3])
  return (
    <>
      {blob.map(
        ({ item, key, props: { x, d, state } }) =>
          item && (
            <Modal key={key} open={open} zIndex={10} fullscreen>
              <MenuWrapper style={{ height: size }}>
                <MorphSvg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 566.9 566.9"
                  preserveAspectRatio="none"
                  style={{
                    transform: x.to(x => `translateX(${x}%)`),
                  }}
                >
                  <animated.path d={d.to(interpolator)} />
                </MorphSvg>
                <OuterWrapper style={fade}>
                  <MobileMenu tickets={tickets} />
                </OuterWrapper>
              </MenuWrapper>
            </Modal>
          )
      )}
    </>
  )
}

export default MobileModal
