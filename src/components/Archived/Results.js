import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useTransition, animated, config } from "react-spring"
import Measure from "react-measure"
import { useInView } from "react-intersection-observer"

import ArchivedTalk from "../ArchivedTalks/ArchivedTalk"

const ResultsWrapper = styled.div`
  position: relative;
  overflow-y: hidden;
  transition: height 1s;
`

const ResultWrapper = styled(animated.div)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`

const Results = ({ items, onLoadMore, done, immediate }) => {
  // Collection of rendered Results' heights
  const [maxHeight, setMaxHeights] = useState({})
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
  // So we can wait for the animation to complete before
  // checking for the waypoint
  useEffect(() => {
    setLoading(true)
  }, [items, setLoading])

  let totalHeight = 0
  let activeHeight = 0
  const transitions = useTransition(
    items.map(data => {
      const height = maxHeight[data.topic] || 0
      return {
        ...data,
        height,
        y: (totalHeight += height) - height,
      }
    }),
    item => item.topic,
    {
      unique: true,
      from: ({ height }) => ({ height, y: totalHeight - height }),
      leave: ({ height }) => ({ height, y: totalHeight + height }),
      enter: ({ y, height }) => ({ y, height }),
      update: ({ y, height }) => ({ y, height }),
      config: config.slow,
      // immediate,
      onRest: item => {
        // We consider the loading state complete when the last item
        // has finished animating.
        // This method is fired every re-render even if the item is already at rest.
        if (!done && loading && item.topic === items[items.length - 1].topic) {
          setLoading(false)
        }
      },
    }
  )
  // Calculate the activeHeight by the sum of all the states that are not leaving
  activeHeight = transitions.reduce((accum, { key, phase }) => {
    if (phase !== "leave") {
      accum += maxHeight[key] || 0
    }
    return accum
  }, 0)

  return (
    <div>
      <ResultsWrapper style={{ height: activeHeight }}>
        {transitions.map(({ item, key, props: { y, height } }, index) => (
          <Measure
            key={key}
            client
            onResize={contentRect => {
              // Update the maxHeight of the item on resize
              if (
                contentRect.client.height !== undefined &&
                contentRect.client.height !== maxHeight[key]
              ) {
                let newHeights = { ...maxHeight }
                newHeights[key] = contentRect.client.height
                setMaxHeights(newHeights)
              }
            }}
          >
            {({ measureRef }) => (
              <ResultWrapper
                style={{
                  zIndex: items.length - index,
                  transform: y
                    ? y.to(y => `translate3d(0,${y}px,0)`)
                    : "translate3d(0,0px,0)",
                  height,
                }}
              >
                <div ref={measureRef}>
                  <ArchivedTalk {...item} />
                </div>
              </ResultWrapper>
            )}
          </Measure>
        ))}
      </ResultsWrapper>
      {!done && !loading && <div ref={ref} />}
    </div>
  )
}

export default Results
