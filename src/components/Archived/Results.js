import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"

import ArchivedTalk from "../ArchivedTalks/ArchivedTalk"

const ResultsWrapper = styled.div`
  position: relative;
  min-height: 500px;
  transition: height 1s;
`

const Results = ({ items, onLoadMore, done }) => {
  // Collection of rendered Results' heights
  const [loading, setLoading] = useState(false)
  // Setup a waypoint indicator
  const [ref, inView] = useInView({ threshold: 0 })
  // When the waypoint is inview attempt to load more results
  useEffect(() => {
    if (inView && !loading) {
      onLoadMore()
    }
  }, [inView, loading, onLoadMore])

  // Whenever the items array changes set state to loading.
  // So we can wait for the render to complete before
  // checking for the waypoint
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [items, setLoading])

  return (
    <div>
      <ResultsWrapper>
        {items.map(item => (
          <ArchivedTalk key={`static-${item.topic}`} {...item} />
        ))}
      </ResultsWrapper>
      {!done && !loading && <div style={{ height: 1 }} ref={ref} />}
    </div>
  )
}

export default Results
