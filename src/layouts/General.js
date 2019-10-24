import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Nav from "../components/Nav"
import Footer from "../components/Footer"

import c from "../styles/constants"
import { large } from "../styles/media"

import Arrow from "../../assets/icons/arrow.svg"

const Main = styled.main`
  transition: padding 0.5s;
  background: ${c.WHITE};

  & > div > div > div > *:first-child:not(.Hero) {
    padding-top: 100px;

    ${large`
      padding-top: 160px;
    `}
  }
`

const Sticky = styled.div`
  position: sticky;
  bottom: ${c.BASE};
  z-index: 1;
`

const ScrollTopButton = styled.button`
  margin: 0 ${c.BASE} 0 auto;
  display: flex;
  width: 46px;
  height: 46px;
  justify-content: center;
  align-items: center;
  background-color: ${c.ORANGE};
  padding: 5px;
  border: none;
  cursor: pointer;

  ${large`
    width: 64px;
    height: 64px;
  `}
`

const General = ({ data: { current }, location: { pathname }, children }) => {
  const tickets = current.edges.length
    ? current.edges[0].node.registration_url
    : ""
  const isHomepage = pathname === "/"
  const scrollTop = pathname === "/archive/"
  return (
    <>
      <Nav tickets={tickets} homepage={isHomepage} pathname={pathname} />
      <Main>{children}</Main>
      {scrollTop && (
        <Sticky>
          <ScrollTopButton
            onClick={() =>
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              })
            }
          >
            <Arrow />
          </ScrollTopButton>
        </Sticky>
      )}
      <Footer tickets={tickets} />
    </>
  )
}

General.propTypes = {
  children: PropTypes.node.isRequired,
}

export default General
