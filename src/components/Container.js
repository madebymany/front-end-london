import styled, { css } from "styled-components"

import { medium, large, xlarge } from "../styles/media"
import c from "../styles/constants"

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${c.BASE};

  ${medium(css`
    max-width: 768px;
    padding: 0 ${c.XL3};
  `)}

  ${large(css`
    max-width: 1024px;
  `)}

  ${xlarge(css`
    max-width: 1082px;
  `)}
`

export default Container
