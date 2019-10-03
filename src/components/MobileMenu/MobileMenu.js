import React from "react"
import styled from "styled-components"

import Container from "../Container"
import c from "../../styles/constants"

import Menu from "../Menu"
import NavBar from "../Nav/NavBar"
import MobileFooter from "./MobileFooter"

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const InnerWrapper = styled.div`
  flex-grow: 1;
  margin-top: ${c.XL5};
`

const MobileMenu = ({ toggleMenu }) => (
  <MenuWrapper>
    <NavBar homepage={false} open={false} toggleMenu={toggleMenu} />
    <InnerWrapper>
      <Container>
        <Menu />
      </Container>
    </InnerWrapper>
    <MobileFooter />
  </MenuWrapper>
)

export default MobileMenu
