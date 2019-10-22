import React, { useState } from "react"
import styled from "styled-components"
import { useTransition, animated, config } from "react-spring"
import Measure from "react-measure"

import ArchivedTalk from "../ArchivedTalks/ArchivedTalk"

const SearchResultsWrapper = styled.div``

const ResultsWrapper = styled.div`
  position: relative;
  min-height: 50vh;
`

const ResultWrapper = styled(animated.div)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`

const SearchResults = ({ results }) => {
  // Collection of rendered Results' heights
  const [maxHeight, setMaxHeights] = useState({})

  let totalHeight = 0
  const transitions = useTransition(
    results.map(data => {
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
      from: () => ({ height: 0, y: totalHeight }),
      leave: () => ({ height: 0, y: totalHeight }),
      enter: ({ y, height }) => ({ y, height }),
      update: ({ y, height }) => ({ y, height }),
      config: config.gentle,
      onDestroyed: item => {
        // Clear out removed Result's heights from state
        const updateHeights = { ...maxHeight }
        delete updateHeights[item.topic]
        setMaxHeights(updateHeights)
      },
    }
  )
  return (
    <SearchResultsWrapper>
      <ResultsWrapper style={{ height: totalHeight }}>
        {transitions.map(({ item, key, props: { y, ...rest } }, index) => {
          return (
            <Measure
              key={key}
              client
              onResize={contentRect => {
                if (
                  contentRect.client.height !== undefined &&
                  contentRect.client.height !== maxHeight[index]
                ) {
                  let newHeights = { ...maxHeight }
                  newHeights[key] = contentRect.client.height
                  setMaxHeights(newHeights)
                }
              }}
            >
              {({ measureRef }) => {
                return (
                  <ResultWrapper
                    style={{
                      zIndex: index,
                      transform: y
                        ? y.to(y => `translate3d(0,${y}px,0)`)
                        : "translate3d(0,0px,0)",
                      ...rest,
                    }}
                  >
                    <div ref={measureRef}>
                      <ArchivedTalk {...item} />
                    </div>
                  </ResultWrapper>
                )
              }}
            </Measure>
          )
        })}
      </ResultsWrapper>
    </SearchResultsWrapper>
  )
}

export default SearchResults
