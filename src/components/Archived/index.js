import React from "react"

import Engine from "./Engine"

const Archive = ({ talks, index, defaultQuery }) => {
  return (
    <Engine talks={talks} chunk={6} index={index} defaultQuery={defaultQuery} />
  )
}

export default Archive
