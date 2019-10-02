import React from "react"

import Talk from "./Talk"

export default ({ talk }) => {
  if (!talk) {
    return null
  }
  return <Talk {...talk} />
}
