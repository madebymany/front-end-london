import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { useSpring, useTransition, animated } from "react-spring"
import { setTimeout, clearTimeout } from "requestanimationframe-timer"

import Nav from "../components/Nav"
import Footer from "../components/Footer"

import c from "../styles/constants"
import { large } from "../styles/media"

import Arrow from "../../assets/icons/arrow.svg"

const Main = styled.main`
  transition: padding 0.5s;
  background: ${c.WHITE};

  & > *:first-child:not(.Hero) {
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
`

const ScrollTopButton = styled.button`
  margin: 0 ${c.BASE} 0 auto;
  display: flex;
  width: 46px;
  height: 46px;
  justify-content: center;
  align-items: center;
  background-color: ${c.ORANGE};
  padding: 5px;
  border: none;
  cursor: pointer;

  ${large`
    width: 64px;
    height: 64px;
  `}
`
let pageChildren = {}
let timer

const shouldUpdateScroll = location => {
  // If there is a location hash smooth scroll to element
  if (location && location.hash) {
    timer = setTimeout(() => {
      const item = document.querySelector(location.hash).offsetTop
      window.scrollTo({ top: item, left: 0, behavior: "smooth" })
    }, 500)

    return
  }

  // If the scroll is set (from shouldScrollUpdate - gatsby-browser.js)
  if (window.__fel_scroll) {
    timer = setTimeout(() => {
      window.scrollTo(...window.__fel_scroll)
    }, 100)
  }
}

const General = ({ data: { current }, location, children }) => {
  const [ready, setReady] = useState(false)
  // Delay rendering of the page until the transition has entered
  const [page, setPage] = useState(false)

  // Triggers the enter and exit of the transition animation
  const [shouldTransition, setTransition] = useState(true)
  const tickets = current.edges.length
    ? current.edges[0].node.registration_url
    : ""
  const isHomepage = location.pathname === "/"
  const scrollTop = location.pathname === "/archive/"

  // This should really never unmount, but just incase
  useEffect(() => {
    return () => clearTimeout(timer)
  }, [])

  // When the first page is ready load the layout in
  // Otherwise we get a flash of an empty page with header & footer
  useEffect(() => {
    if (!ready && page) {
      setReady(true)
    }
  }, [ready, page, setReady])

  useEffect(() => {
    const { skipTransition } = location.state
    // If the state contains skipTransition, automatically set the page
    if (skipTransition) {
      setPage(location.pathname)
      shouldUpdateScroll(location)
    }
    // Otherwise only set the transition if the pathname changes
    else if (location.pathname !== page) {
      setTransition(true)
    }
  }, [location, setTransition, page, setPage])

  // Keep reference to the children so we can persist until transition is complete
  pageChildren[location.pathname] = children

  const fadeIn = useSpring({ to: { opacity: ready ? 1 : 0 } })

  const overlay = useTransition(shouldTransition, null, {
    from: {
      d:
        "M283.5,-25.7497051 C-36.7307118,-25.7458888 -176.646751,-39.7282016 -176.646751,73.5945902 C-176.646751,186.917382 -113.613852,139.977601 -113.613852,212.052626 C-113.613852,284.12765 -196.644217,256.7393 -196.644217,399.746183 C-196.644217,542.753066 -22.9968433,600.71012 283.5,600.71012 C589.996843,600.71012 1060.80656,603.467879 1060.80656,423.419244 C1060.80656,243.370609 603.135313,204.996266 603.135313,123.72718 C603.135313,42.4580939 662.651389,84.5633329 662.651389,28.0346645 C662.651389,-28.4940039 603.730712,-25.7535214 283.5,-25.7497051 Z",
      transform: "translateX(120%)",
    },
    enter: {
      d:
        "M283.5,-25.7497051 C-36.7307118,-25.7458888 -561.345905,-87.6937632 -561.345905,111.121846 C-561.345905,309.937455 -378.963306,283.200074 -378.963306,385.021229 C-378.963306,443.544974 -473,402.383061 -473,497.885049 C-473,593.387037 -22.9968433,600.705228 283.5,600.705228 C589.996843,600.705228 1163.42952,583.939127 1163.42952,486.032641 C1163.42952,388.126155 602.32557,400.499201 602.32557,264.4331 C602.32557,128.366998 777.468033,180.388655 777.468033,84.8499099 C777.468033,-10.6888355 603.730712,-25.7535214 283.5,-25.7497051 Z",
      transform: "translateX(0%)",
    },
    leave: {
      d:
        "M283.5,-25.7497051 C-36.7307118,-25.7458888 -473,-2.36537066 -473,110.957421 C-473,224.280213 -87.3761812,165.485765 -87.3761812,284.661842 C-87.3761812,403.83792 -198.418303,380.261643 -198.418303,460.329545 C-198.418303,540.397446 -22.9968433,600.705228 283.5,600.705228 C589.996843,600.705228 707.981094,671.363753 707.981094,460.329545 C707.981094,249.295336 610.367425,190.921384 610.367425,141.901247 C610.367425,92.8811099 667.47809,123.760325 667.47809,36.0313795 C667.47809,-51.6975656 603.730712,-25.7535214 283.5,-25.7497051 Z",
      transform: "translateX(-120%)",
    },
    config: { duration: c.TRANSITION_DURATION / 2 },
    onRest: () => {
      // When the transition has entered immediately remove it
      // Allows us to switch the page for the incoming one
      if (shouldTransition) {
        setTransition(false)
        setPage(location.pathname)
        shouldUpdateScroll(location)
      }
    },
  })
  return (
    <>
      <animated.div style={fadeIn}>
        <Nav tickets={tickets} homepage={isHomepage} location={location} />
        <Main>{pageChildren[page]}</Main>
        {scrollTop && (
          <Sticky>
            <ScrollTopButton
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
      {overlay.map(
        ({ item, key, props: { transform, d } }) =>
          item && (
            <animated.div
              key={key}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1000,
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 567 567"
                preserveAspectRatio="none"
              >
                <animated.path d={d} style={{ transform }} fill={c.ORANGE} />
              </svg>
            </animated.div>
          )
      )}
    </>
  )
}

General.propTypes = {
  children: PropTypes.node.isRequired,
}

export default General
