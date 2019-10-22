import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Nav from "../components/Nav"
import Footer from "../components/Footer"

import c from "../styles/constants"
import { large } from "../styles/media"

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

const General = ({ data: { current }, location: { pathname }, children }) => {
  const tickets = current.edges.length
    ? current.edges[0].node.registration_url
    : ""
  const isHomepage = pathname === "/"
  return (
    <>
      <Nav tickets={tickets} homepage={isHomepage} pathname={pathname} />
      <Main>{children}</Main>
      <Footer tickets={tickets} />
    </>
  )
}

General.propTypes = {
  children: PropTypes.node.isRequired,
}

export default General
