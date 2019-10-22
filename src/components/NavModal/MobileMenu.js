import React from "react"
import styled from "styled-components"

import Container from "../Container"
import c from "../../styles/constants"

import Menu from "../Menu"
import MobileFooter from "./MobileFooter"

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 100;
`

const InnerWrapper = styled.div`
  flex-grow: 1;
  margin-top: ${c.XL5};
`

const MobileMenu = ({ tickets }) => (
  <MenuWrapper>
    <InnerWrapper>
      <Container>
        <Menu tickets={tickets} />
      </Container>
    </InnerWrapper>
    <MobileFooter />
  </MenuWrapper>
)

export default MobileMenu
