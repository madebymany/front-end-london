import { useState, useLayoutEffect } from "react"

const DelayMount = ({ children }) => {
  const [mounted, setMount] = useState(false)

  useLayoutEffect(() => {
    setMount(true)
  }, [])

  if (!mounted) {
    return null
  }

  return children
}

export default DelayMount
