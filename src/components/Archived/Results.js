import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import { setTimeout, clearTimeout } from "requestanimationframe-timer"
import ArchivedTalk from "../ArchivedTalks/ArchivedTalk"

const ResultsWrapper = styled.div`
  position: relative;
  min-height: 500px;
  transition: height 1s;
`

let timer

const Results = ({ items, onLoadMore, done, placeholder }) => {
  // Collection of rendered Results' heights
  const [loading, setLoading] = useState(false)
  // Setup a waypoint indicator
  const [ref, inView] = useInView({ threshold: 0 })

  // When the waypoint is inview attempt to load more results
  // It seems the inView value isn't correct after the delayTimer is fired
  // So poll the effect until it settles
  useEffect(() => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (inView && !loading) {
        onLoadMore()
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [inView, loading, onLoadMore])

  // Whenever the items array changes set state to loading.
  // So we can wait for the render to complete before
  // checking for the waypoint
  useEffect(() => {
    setLoading(true)
    const delayTimer = setTimeout(() => {
      setLoading(false)
    }, 200)
    return () => clearTimeout(delayTimer)
  }, [items, setLoading])

  return (
    <div>
      <ResultsWrapper aria-live="polite">
        {items.map(item => (
          <ArchivedTalk key={item.topic} {...item} placeholder={placeholder} />
        ))}
      </ResultsWrapper>
      {!done && !loading && <div style={{ height: 1 }} ref={ref} />}
    </div>
  )
}

export default Results
