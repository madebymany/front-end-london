import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import { MenuLink, ExternalMenuLink } from "../Links"
import c from "../../styles/constants"

const MenuWrapper = styled.nav`
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: ${c.BASE};
  }
`

const Menu = ({ tickets }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menuLinks {
            link
            name
          }
        }
      }
    }
  `)
  const menu = data.site.siteMetadata && data.site.siteMetadata.menuLinks
  return (
    <MenuWrapper>
      <MenuLink to="/">Home</MenuLink>
      {tickets && (
        <ExternalMenuLink href={tickets}>Get tickets</ExternalMenuLink>
      )}
      {menu &&
        menu.map(item => (
          <MenuLink key={item.link} to={item.link}>
            {item.name}
          </MenuLink>
        ))}
    </MenuWrapper>
  )
}

export default Menu
