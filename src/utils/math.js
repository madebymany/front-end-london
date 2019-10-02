// Creates a random number from a seeded value
export const rand = seed => {
  const xfnv1a = str => {
    let h = 2166136261 >>> 0
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 16777619)
    }
    return () => {
      h += h << 13
      h ^= h >>> 7
      h += h << 3
      h ^= h >>> 17
      return (h += h << 5) >>> 0
    }
  }

  const sfc32 = (a, b, c, d) => () => {
    a >>>= 0
    b >>>= 0
    c >>>= 0
    d >>>= 0
    var t = (a + b) | 0
    a = b ^ (b >>> 9)
    b = (c + (c << 3)) | 0
    c = (c << 21) | (c >>> 11)
    d = (d + 1) | 0
    t = (t + d) | 0
    c = (c + t) | 0
    return (t >>> 0) / 4294967296
  }

  const seedGenerator = xfnv1a(seed)
  return sfc32(
    seedGenerator(),
    seedGenerator(),
    seedGenerator(),
    seedGenerator()
  )
}

// Converts degrees to radians.
export const rad = deg => {
  return (deg / 360) * 2 * Math.PI
}

// Converts radians to degrees.
export const deg = rad => {
  return (((rad / Math.PI) * 1) / 2) * 360
}

// Calculates distance between two points.
export const distance = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

// Calculates the angle of the line from p1 to p2 in degrees.
export const angle = (p1, p2) => {
  return deg(Math.atan2(p2.y - p1.y, p2.x - p1.x))
}
