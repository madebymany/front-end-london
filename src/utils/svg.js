import { angle, distance, rad, rand } from "./math"

// Translates a point's [x,y] cartesian coordinates into values relative to the viewport.
// Translates the angle from degrees to radians and moves the start angle a half rotation.
export const interpolate = (point, height) => {
  const handles = point.handles || { angle: 0, out: 0, in: 0 }
  handles.angle = Math.PI + rad(handles.angle)
  return {
    x: point.x,
    y: height - point.y,
    handles,
  }
}

// Safe array access at any index using a modulo operation that will always be positive.
export const loopAccess = arr => i => {
  return arr[((i % arr.length) + arr.length) % arr.length]
}

// Smooths out the path made up of the given points. This will override the existing handles.
// https://math.stackexchange.com/questions/873224/calculate-control-points-of-cubic-bezier-curve-approximating-a-part-of-a-circle
export const smooth = (points, opt) => {
  if (points.length === 2) return points

  const out = []

  for (let i = 0; i < points.length; i++) {
    const point = loopAccess(points)(i)
    const before = loopAccess(points)(i - 1)
    const after = loopAccess(points)(i + 1)

    out.push({
      x: point.x,
      y: point.y,
      handles: {
        angle: angle(before, after),
        in: opt.strength * (1 / 2) * distance(point, before),
        out: opt.strength * (1 / 2) * distance(point, after),
      },
    })
  }

  return out
}

// Converts a collection of points to a svg path d attribute
export const pointsToPath = (p, size) => {
  const transform = [...p]
  const points = transform.map(point => interpolate(point, size))

  // Compute guides from input point data.
  const handles = []
  for (let i = 0; i < points.length; i++) {
    const { x, y, handles: hands } = loopAccess(points)(i)

    const next = loopAccess(points)(i + 1)
    const nextHandles = next.handles

    if (hands === undefined) {
      handles.push({ x1: x, y1: y, x2: next.x, y2: next.y })
      continue
    }

    handles.push({
      x1: x - Math.cos(hands.angle) * hands.out,
      y1: y + Math.sin(hands.angle) * hands.out,
      x2: next.x + Math.cos(nextHandles.angle) * nextHandles.in,
      y2: next.y - Math.sin(nextHandles.angle) * nextHandles.in,
    })
  }

  // Render path data attribute from points and handles. Must loop more times than the
  // number of points in order to correctly close the path.
  let path = ""
  for (let i = 0; i <= points.length; i++) {
    const point = loopAccess(points)(i)
    const hands = loopAccess(handles)(i - 1)

    // Start at the first point's coordinates.
    if (i === 0) {
      path += `M${point.x},${point.y}`
      continue
    }

    // Add cubic bezier coordinates using the computed handle positions.
    path += `C${hands.x1},${hands.y1},${hands.x2},${hands.y2},${point.x},${point.y}`
  }

  return path
}

export const blob = (complexity, contrast, size, seed = Date.now()) => {
  const rgen = rand(seed)
  const count = 3 + Math.floor(14 * complexity)
  const angle = 360 / count
  const radius = size / Math.E

  const points = []
  for (let i = 0; i < count; i++) {
    const rand = 1 - 0.8 * contrast * rgen()

    points.push({
      x: Math.sin(rad(i * angle)) * radius * rand + size / 2,
      y: Math.cos(rad(i * angle)) * radius * rand + size / 2,
    })
  }

  const smoothed = smooth(points, {
    closed: true,
    strength: ((4 / 3) * Math.tan(rad(angle / 4))) / Math.sin(rad(angle / 2)),
  })

  return smoothed
}

export const wave = (width, height, counter) => {
  const rgen = rand(counter)
  const count = 3
  const angle = 180 / count
  let direction = counter % 2 === 0 ? 0.5 : 0
  const step = width / count
  const offset = counter % 2 === 0 ? step * rgen() : 0
  const points = []
  for (let i = 0; i <= count; i++) {
    const factor = (1 - rgen()) / 2 + direction * rgen()
    points.push({
      x: step * i + offset * rgen() * 2,
      y: height * factor,
    })
    direction = direction === 0 ? 0.5 : 0
  }

  // Add closing points
  points.push({
    x: width * 1.5,
    y: 0,
  })
  points.push({
    x: width * -0.5,
    y: 0,
  })

  const smoothed = smooth(points, {
    closed: true,
    strength: ((4 / 3) * Math.tan(rad(angle / 4))) / Math.sin(rad(angle / 2)),
  })

  return smoothed
}
