import React from "react"
import smoothscroll from "smoothscroll-polyfill"
import { setTimeout } from "requestanimationframe-timer"

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

const getTargetOffset = hash => {
  const id = window.decodeURI(hash.replace(`#`, ``))
  if (id !== ``) {
    const element = document.getElementById(id)
    if (element) {
      return element.offsetTop
    }
  }
  return null
}

const onInitialClientRender = () => {
  requestAnimationFrame(() => {
    // Wait for body render
    setTimeout(() => {
      const offset = getTargetOffset(window.location.hash)
      if (offset !== null) {
        window.scrollTo(0, offset)
      }
    }, 100)
  })
}

const shouldUpdateScroll = ({ prevRouterProps, routerProps: { location } }) => {
  if (prevRouterProps.location.pathname === location.pathname) {
    if (location.hash) {
      const smoothOffset = getTargetOffset(location.hash)
      if (smoothOffset) {
        window.scrollTo({ top: smoothOffset, left: 0, behavior: "smooth" })
      }
    }
    return false
  }

  const offset = getTargetOffset(location.hash)
  return offset !== null ? [0, offset] : true
}

export {
  wrapPageElement,
  wrapRootElement,
  onInitialClientRender,
  shouldUpdateScroll,
}
