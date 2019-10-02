import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Nav from "../components/Nav"
import Hero from "../components/Hero"
import Footer from "../components/Footer"

const Wrapper = styled.main``

const HomePage = ({ children, tickets }) => {
  return (
    <>
      <Nav tickets={tickets} homepage />
      <Wrapper>
        <Hero />
        {children}
      </Wrapper>
      <Footer tickets={tickets} />
    </>
  )
}

HomePage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HomePage
