import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import Footer from "./Footer"
import FooterCopyright from "./FooterCopyright"
import c from "../../styles/constants"

const Wrapper = styled.footer`
  padding: ${c.XL8} ${c.XL};
`

const FooterContainer = ({ tickets }) => {
  const data = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
          socialLinks {
            icon
            link
          }
        }
      }
    }
  `)
  return (
    <Wrapper>
      <Footer tickets={tickets} />
      <FooterCopyright />
    </Wrapper>
  )
}

export default FooterContainer
