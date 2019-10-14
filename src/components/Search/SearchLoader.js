import React from "react"
import { useTransition, animated } from "react-spring"

import Loader from "../Blob/Loader"

const SearchLoader = ({ isLoaded, onExited }) => {
  const loader = useTransition(isLoaded, null, {
    from: {
      transform: "scale(1)",
      maxHeight: "100%",
    },
    enter: { transform: "scale(1)", maxHeight: "100%" },
    leave: { transform: "scale(0)", maxHeight: "0%" },
    onDestroyed: () => {
      if (onExited) {
        onExited(true)
      }
    },
  })

  return (
    <>
      {loader.map(
        ({ item, props }) =>
          !item && (
            <animated.div key="loader" style={props}>
              <Loader />
            </animated.div>
          )
      )}
    </>
  )
}

export default SearchLoader
