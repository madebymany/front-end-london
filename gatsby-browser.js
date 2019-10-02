import React from "react"
import GlobalStyle from "./src/styles/globalStyle"

const wrapRootElement = ({ element }) => {
  return (
    <>
      <GlobalStyle />
      {element}
    </>
  )
}

export { wrapRootElement }
