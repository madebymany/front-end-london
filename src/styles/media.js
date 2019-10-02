import { css } from "styled-components"

export const small = inner => css`
  @media (min-width: 640px) {
    ${inner}
  }
`

export const medium = inner => css`
  @media (min-width: 768px) {
    ${inner}
  }
`

export const large = inner => css`
  @media (min-width: 1024px) {
    ${inner}
  }
`

export const xlarge = inner => css`
  @media (min-width: 1280px) {
    ${inner}
  }
`
