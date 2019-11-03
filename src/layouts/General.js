import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

import Nav from "../components/Nav"
import Footer from "../components/Footer"

import { IconButton } from "../components/Button"

import c from "../styles/constants"
import { large } from "../styles/media"

import Arrow from "../../assets/icons/arrow.svg"

const Main = styled.main`
  background: ${c.WHITE};
  transition: padding 0.5s;

  & > div > *:first-child:not(.Hero) {
    padding-top: 100px;

    ${large`
      padding-top: 160px;
    `}
  }
`

const Wrapper = styled(motion.div)`
  & + & {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`

const Sticky = styled.div`
  position: sticky;
  bottom: ${c.BASE};
  z-index: 1;
  width: 100%;
  margin: 0 auto;

  ${large`
    max-width: 1480px;
  `}
`

const ScrollTopButton = styled(IconButton)`
  margin: 0 ${c.BASE} 0 auto;
  width: 46px;
  height: 46px;

  ${large`
    width: 64px;
    height: 64px;
  `}
`

const General = ({ data: { current }, location, children }) => {
  // Triggers the enter and exit of the transition animation
  const tickets = current.edges.length
    ? current.edges[0].node.registration_url
    : ""
  const isHomepage = location.pathname === "/"
  const scrollTop = location.pathname === "/archive/"

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Nav tickets={tickets} homepage={isHomepage} location={location} />
        <Main>
          <AnimatePresence initial={false}>
            <Wrapper
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </Wrapper>
          </AnimatePresence>
        </Main>
        {scrollTop && (
          <Sticky>
            <ScrollTopButton
              primary
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
      </motion.div>
    </>
  )
}

General.propTypes = {
  children: PropTypes.node.isRequired,
}

export default General
