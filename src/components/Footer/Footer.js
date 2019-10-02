import React from "react"
import styled from "styled-components"

import Container from "../Container"
import { Row, Column } from "../Grid"
import Menu from "../Menu"
import c from "../../styles/constants"

import Logo from "../../../static/images/logo.svg"

const Wrapper = styled.div`
  border-bottom: 1px solid ${c.GREY};
  padding-bottom: ${c.XL7};
`
const LogoColumn = styled(Column)`
  text-align: right;
`

const FooterLogo = styled.img`
  width: 290px;
  max-width: 100%;
`

const Footer = ({ tickets }) => (
  <Wrapper>
    <Container>
      <Row>
        <Column md={0.5}>
          <Menu tickets={tickets} />
        </Column>
        <LogoColumn md={0.5}>
          <FooterLogo src={Logo} alt="Frontend London" />
        </LogoColumn>
      </Row>
    </Container>
  </Wrapper>
)

export default Footer
