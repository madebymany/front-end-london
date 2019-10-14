import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Spring } from "react-spring/renderprops"
import { animated, config } from "react-spring"
import { TransitionPortal } from "gatsby-plugin-transition-link"

import c from "../styles/constants"

const TransitionWrapper = styled(animated.div)`
  position: fixed;
  background: ${props => props.fill};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
/**
 * The preventTransition prop is a temporary fix until it's possible
 * to control Transition keys:
 * https://github.com/TylerBarnes/gatsby-plugin-transition-link/issues/140
 */
const Animated = ({
  children,
  transitionStatus,
  preventTransition = false,
  fill = c.ORANGE,
}) => {
  const [start, setStart] = useState(true)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (start) {
      document.body.style.backgroundColor =
        fill === c.ORANGE ? c.WHITE : c.ORANGE
    }
  }, [start, fill])

  useEffect(() => {
    if (transitionStatus === "entering") {
      setStart(true)
    }
  }, [transitionStatus])

  useEffect(() => {
    if (done) {
      setStart(false)
    }
  }, [done])

  return (
    <>
      <Spring from={{ opacity: 1 }} to={{ opacity: 1 }} config={config.slow}>
        {props => (
          <animated.div
            style={{
              ...props,
              zIndex: ["entering", "entered"].includes(transitionStatus)
                ? 0
                : 100,
            }}
          >
            {children}
          </animated.div>
        )}
      </Spring>
      {start && (
        <TransitionPortal>
          <Spring
            from={{ transform: "translateX(100%)" }}
            to={{ transform: "translateX(-100%)" }}
            // reset={transitionStatus === "entering"}
            config={{
              ...config.slow,
              duration: preventTransition ? 0 : 1000,
            }}
            onRest={() => setDone(true)}
          >
            {props => (
              <TransitionWrapper
                fill={preventTransition ? "transparent" : fill}
                style={props}
              />
            )}
          </Spring>
        </TransitionPortal>
      )}
    </>
  )
}

export default Animated
