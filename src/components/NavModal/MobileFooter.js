import React from "react"
import styled from "styled-components"

import Container from "../Container"
import { Copy } from "../Text"
import { ExternalCopyLink } from "../Links"
import c from "../../styles/constants"

const MobileFooterWrapper = styled.div`
  border-top: 1px solid ${c.GREY};
  padding-top: ${c.XL5};
`

const SmallHeading = styled.h4`
  font-weight: 600;
  font-size: ${c.XL};
  margin: 0;
`

const MobileFooter = () => (
  <Container>
    <MobileFooterWrapper>
      <SmallHeading>Want to give a talk at FEL?</SmallHeading>
      <Copy>
        Contact us:{" "}
        <ExternalCopyLink to="mailto:fel@madebymany.co.uk">
          fel@madebymany.co.uk
        </ExternalCopyLink>
        <br />
        <ExternalCopyLink to="https://twitter.com/frontendlondon">
          @frontendlondon
        </ExternalCopyLink>
      </Copy>
    </MobileFooterWrapper>
  </Container>
)

export default MobileFooter
