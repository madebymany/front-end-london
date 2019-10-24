import React from "react"
import { enablePageScroll } from "scroll-lock"
import GlobalStyle from "./src/styles/globalStyle"

const loadPolyfills = async () => {
  if (typeof window.IntersectionObserver === "undefined") {
    await import("intersection-observer")
  }
}

loadPolyfills()

const wrapRootElement = ({ element }) => {
  return (
    <>
      <GlobalStyle />
      {element}
    </>
  )
}

const onPreRouteUpdate = () => {
  enablePageScroll()
}

const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
  return prevRouterProps.location.pathname !== routerProps.location.pathname
}

export { wrapRootElement, onPreRouteUpdate, shouldUpdateScroll }
