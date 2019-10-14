import React from "react"
import styled from "styled-components"

import Footer from "./Footer"
import FooterCopyright from "./FooterCopyright"
import c from "../../styles/constants"

const Wrapper = styled.footer`
  padding: ${c.XL8} ${c.XL};
  background-color: ${c.WHITE};
`

const FooterContainer = ({ tickets }) => (
  <Wrapper>
    <Footer tickets={tickets} />
    <FooterCopyright />
  </Wrapper>
)

export default FooterContainer
