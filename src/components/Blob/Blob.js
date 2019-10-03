import React from "react"
import PropTypes from "prop-types"
import { config } from "react-spring"
import { Spring } from "react-spring/renderprops"

import { blob, pointsToPath } from "../../utils/svg"
import { flatten, unflatten } from "flat"

/**
 * Render Prop implementation of an SVG Path Blob.
 * Due to the complexity of SVG heirar
 *
 * @class Blob
 * @extends {React.Component}
 */
class Blob extends React.Component {
  state = {
    points: {},
    initial: {},
    reset: false,
  }

  counter = 0

  componentDidUpdate(prevProps) {
    const { size, run } = this.props
    // When the size changes we want to reset the Spring
    // and re-initialise the points
    if (size && size !== prevProps.size) {
      this.counter = 0
      const initial = this.generateBlob()
      this.setState(
        {
          initial,
          points: run ? this.generateBlob() : initial,
          reset: true,
        },
        () => {
          this.setState({ reset: false })
        }
      )
    }

    // Check if the animation has changed running state
    if (run && !prevProps.run) {
      this.updateBlob()
    }
  }

  generateBlob() {
    const { complexity, contrast, size, seed } = this.props
    const points = blob(complexity, contrast, size, `${seed}${this.counter}`)

    this.counter += 1

    return flatten(points)
  }

  updateBlob = () => {
    const { run } = this.props
    if (run) {
      this.setState({ points: this.generateBlob() })
    }
  }

  render() {
    const { children, size } = this.props
    const { initial, points, reset } = this.state

    // Dont render if we don't have points
    if (Object.keys(points).length === 0) {
      return null
    }

    return (
      <Spring
        from={initial}
        to={points}
        onRest={this.updateBlob}
        delay={2000}
        reset={reset}
        config={{
          ...config.wobbly,
          duration: 10000,
        }}
      >
        {interpolatedPoints => {
          const unflattenPoints = unflatten(interpolatedPoints)
          return children(
            pointsToPath(
              Object.keys(unflattenPoints).map(key => unflattenPoints[key]),
              size
            )
          )
        }}
      </Spring>
    )
  }
}

Blob.propTypes = {
  run: PropTypes.bool,
}

Blob.defaultProps = {
  run: false,
}

export default Blob
