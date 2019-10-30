import React, { useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { useSpring, useTransition, animated } from "react-spring"
import { setTimeout, clearTimeout } from "requestanimationframe-timer"

import Nav from "../components/Nav"
import Footer from "../components/Footer"

import { IconButton } from "../components/Button"

import c from "../styles/constants"
import { large } from "../styles/media"

import Arrow from "../../assets/icons/arrow.svg"

const Main = styled.main`
  transition: padding 0.5s;
  background: ${c.WHITE};

  & > div > *:first-child:not(.Hero) {
    padding-top: 100px;

    ${large`
      padding-top: 160px;
    `}
  }
`

const Sticky = styled.div`
  position: sticky;
  bottom: ${c.BASE};
  z-index: 1;
  width: 100%;
  margin: 0 auto;

  ${large`
    max-width: 1480px;
  `}
`

const ScrollTopButton = styled(IconButton)`
  margin: 0 ${c.BASE} 0 auto;
  width: 46px;
  height: 46px;

  ${large`
    width: 64px;
    height: 64px;
  `}
`

let pageChildren = {}
let timer = null

const shouldUpdateScroll = location => {
  // We are already scrolling
  if (timer !== null) {
    return
  }

  // If there is a location hash smooth scroll to element
  if (location && location.hash) {
    timer = setTimeout(() => {
      const item = document.querySelector(location.hash).offsetTop
      window.scrollTo({ top: item, left: 0, behavior: "smooth" })
      timer = null
    }, 300)

    return
  }

  // If the scroll is set (from shouldScrollUpdate - gatsby-browser.js)
  if (typeof window !== "undefined" && window.__fel_scroll) {
    timer = setTimeout(() => {
      window.scrollTo(...window.__fel_scroll)
      timer = null
    }, 100)
  }
}

const General = ({ data: { current }, location, children }) => {
  // Triggers the enter and exit of the transition animation
  const tickets = current.edges.length
    ? current.edges[0].node.registration_url
    : ""
  const isHomepage = location.pathname === "/"
  const scrollTop = location.pathname === "/archive/"

  // This should really never unmount, but just incase
  useEffect(() => {
    return () => clearTimeout(timer)
  }, [])

  // Keep reference to the children so we can persist until transition is complete
  pageChildren[location.pathname] = children

  const fadeIn = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } })

  const pages = useTransition(location, location => location.pathname, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    onStart: item => {
      if (item.pathname === location.pathname) {
        shouldUpdateScroll(location)
      }
    },
  })

  return (
    <>
      <animated.div style={fadeIn}>
        <Nav tickets={tickets} homepage={isHomepage} location={location} />
        <Main>
          {pages.map(({ item, props, key }) => (
            <animated.div key={key} style={props}>
              {pageChildren[item.pathname]}
            </animated.div>
          ))}
        </Main>
        {scrollTop && (
          <Sticky>
            <ScrollTopButton
              primary
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }
            >
              <Arrow />
            </ScrollTopButton>
          </Sticky>
        )}
        <Footer tickets={tickets} />
      </animated.div>
    </>
  )
}

General.propTypes = {
  children: PropTypes.node.isRequired,
}

export default General
