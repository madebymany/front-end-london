import React from "react"
import styled from "styled-components"

import Container from "../Container"
import c from "../../styles/constants"

import Menu from "../Menu"
import MobileFooter from "./MobileFooter"

const FullHeightContainer = styled(Container)`
  height: 100%;
`

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  z-index: 100;

  @media (orientation: landscape) {
    flex-direction: row;

    & > div {
      width: 50%;
    }
  }
`

const InnerWrapper = styled.div`
  flex-grow: 1;
  margin-top: ${c.XL5};
`

const MobileMenu = ({ tickets }) => (
  <FullHeightContainer>
    <MenuWrapper>
      <InnerWrapper>
        <Menu tickets={tickets} />
      </InnerWrapper>
      <MobileFooter />
    </MenuWrapper>
  </FullHeightContainer>
)

export default MobileMenu
