import styled, { css } from "styled-components"
import { transparentize } from "polished"
import { medium } from "../styles/media"
import c from "../styles/constants"

export const Strap = styled.h3`
  font-weight: ${c.BOLD};
  font-size: ${c.SMALL};
  text-transform: uppercase;
  margin: 0 0 ${c.XS} 0;
`

export const Heading = styled.h2`
  font-weight: 600;
  font-size: ${c.XL4};
  line-height: 1.28;
  margin: ${c.BASE} 0;

  ${medium(css`
    margin: ${c.XL5} 0;
    font-size: ${c.XL6};
    line-height: 1;
  `)}
`

export const Copy = styled.p`
  color: ${c.BLACK2};
  font-weight: 400;
  font-size: ${c.LARGE};
  line-height: 1.55;

  ${medium(css`
    font-size: ${c.XL2};
    line-height: 1.45;
  `)}
`

export const Text = styled.p`
  font-weight: 400;
  font-size: ${c.LARGE};
  line-height: 1.66;
`

export const FinePrint = styled.p`
  font-weight: 400;
  font-size: ${c.SMALL};
  line-height: 1.7;
`

export const Notification = styled(Copy)`
  border: 1px solid ${transparentize(0.7, c.ORANGE)};
  padding: ${c.XL3};
  margin-bottom: ${c.XL6};
`
