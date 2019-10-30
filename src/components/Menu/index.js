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

const Menu = ({ tickets, exclude = [] }) => {
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
  const siteMetadata = data.site.siteMetadata
    ? data.site.siteMetadata.menuLinks
    : []
  const ticketsLink = tickets
    ? [
        {
          link: tickets,
          name: "Get tickets",
        },
      ]
    : []

  const menu = [
    {
      link: "/",
      name: "Home",
    },
    ...ticketsLink,
    ...siteMetadata,
  ].filter(item => !exclude.includes(item.link))

  return (
    <MenuWrapper>
      {menu.map(item => {
        const external = item.link.indexOf("//") === 0
        const ComponentLink = external ? ExternalMenuLink : MenuLink
        const linkProps = {
          to: item.link,
        }
        return (
          <div key={item.name}>
            <ComponentLink {...linkProps}>{item.name}</ComponentLink>
          </div>
        )
      })}
    </MenuWrapper>
  )
}

export default Menu
