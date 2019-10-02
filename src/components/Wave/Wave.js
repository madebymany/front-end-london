import React from "react"
import PropTypes from "prop-types"
import { config } from "react-spring"
import { Spring } from "react-spring/renderprops"

import { wave, pointsToPath } from "../../utils/svg"
import { flatten, unflatten } from "flat"

/**
 * Render Prop implementation of an SVG Path Blob.
 * Due to the complexity of SVG heirar
 *
 * @class Wave
 * @extends {React.Component}
 */
class Wave extends React.Component {
  state = {
    size: {
      width: 0,
      height: 0,
    },
    initial: {},
    points: {},
    reset: false,
  }
  counter = 1

  componentDidUpdate(prevProps) {
    const { size, run } = this.props
    // When the size changes we want to reset the Spring
    // and re-initialise the points
    if (size && size.width && size.width !== prevProps.size.width) {
      this.counter = 1
      this.setState(
        {
          initial: this.generateWave(),
          points: this.generateWave(),
          reset: true,
        },
        () => {
          this.setState({ reset: false })
        }
      )
    }

    // Check if the animation has changed running state
    if (run && !prevProps.run) {
      this.updateWave()
    }
  }

  generateWave() {
    const { size } = this.props
    const points = wave(size.width, size.height, this.counter)

    this.counter += 1

    return flatten(points)
  }

  updateWave = () => {
    const { run } = this.props
    if (run) {
      this.setState({ points: this.generateWave() })
    }
  }

  render() {
    const { children, size } = this.props
    const { initial, points } = this.state

    // Dont render if we don't have points
    if (Object.keys(points).length === 0) {
      return null
    }

    return (
      <Spring
        from={initial}
        to={points}
        onRest={this.updateWave}
        delay={2000}
        config={{
          ...config.molasses,
          duration: 20000,
        }}
      >
        {interpolatedPoints => {
          const unflattenPoints = unflatten(interpolatedPoints)
          return children(
            pointsToPath(
              Object.keys(unflattenPoints).map(key => unflattenPoints[key]),
              size.height
            )
          )
        }}
      </Spring>
    )
  }
}

Wave.propTypes = {
  run: PropTypes.bool,
}

Wave.defaultProps = {
  run: false,
}

export default Wave
