import React from "react"
import { enablePageScroll } from "scroll-lock"
import smoothscroll from "smoothscroll-polyfill"

import GlobalStyle from "./src/styles/globalStyle"

const loadPolyfills = async () => {
  smoothscroll.polyfill()
  if (typeof window.IntersectionObserver === "undefined") {
    await import("intersection-observer")
  }
}

loadPolyfills()

const wrapRootElement = ({ element, props }) => {
  return (
    <>
      <GlobalStyle />
      {element}
    </>
  )
}

const wrapPageElement = require("./src/wrapper")

window.addEventListener("popstate", () => {
  // If the browser back/forward buttons are pressed we should force scroll update
  window.__fel_forcestate = true
})

const onPreRouteUpdate = ({ location, prevLocation }) => {
  // Re-enable scrolling if the route changes, really an escape hatch
  enablePageScroll()

  // If there is no previous location attempt to fetch scroll data
  if (!prevLocation) {
    const scroll = window.sessionStorage.getItem(
      `@@scroll|${location.key || location.pathname}`
    )
    if (scroll) {
      window.__fel_scroll = scroll
        .substring(1, scroll.length - 1)
        .split(",")
        .map(value => Number(value))
    }
  }
}

const shouldUpdateScroll = ({
  prevRouterProps,
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  // Always resest to top, so transitions look good
  if (prevRouterProps.location.pathname !== location.pathname) {
    window.scrollTo(0, 0)
  }

  // When a an anchor link is clicked which has the same pathname as the target
  // This is the only place to smooth scroll to element (and we can do it instantly - no transition)
  // This is because the router doesnt detect the change in search or hash
  if (
    prevRouterProps.location.pathname === location.pathname &&
    location.hash
  ) {
    const item = document.querySelector(location.hash).offsetTop
    window.scrollTo({ top: item, left: 0, behavior: "smooth" })
    window.__fel_scroll = null
  }

  if (window.__fel_forcestate) {
    window.__fel_scroll = getSavedScrollPosition(location)
  }
  // If the pathname changes reset scroll to the top
  // If there is a hash General.js will pick it up, and ignore this
  else if (prevRouterProps.location.pathname !== location.pathname) {
    window.__fel_scroll = [0, 0]
  }

  // Reset state
  window.__fel_forcestate = false

  return false
}

export {
  wrapPageElement,
  wrapRootElement,
  onPreRouteUpdate,
  shouldUpdateScroll,
}
