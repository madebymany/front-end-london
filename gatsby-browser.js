import React from "react"
import { enablePageScroll } from "scroll-lock"
import GlobalStyle from "./src/styles/globalStyle"

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

export { wrapRootElement, onPreRouteUpdate }
