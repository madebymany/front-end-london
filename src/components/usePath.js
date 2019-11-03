import { useState } from "react"

const usePath = (paths, start = 0) => {
  const getIndex = (current = null) => {
    const newIndex = Math.floor(Math.random() * paths.length)
    if (current !== null && newIndex === current) {
      return getIndex(current)
    }
    return newIndex
  }

  const [index, setIndex] = useState(getIndex(start))

  const next = () => {
    setIndex(getIndex(index))
  }

  return [paths[index], next]
}

export default usePath
