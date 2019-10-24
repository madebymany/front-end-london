import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { useTransition, animated } from "react-spring"

import { MenuLink, ExternalMenuLink } from "../Links"
import c from "../../styles/constants"

const MenuWrapper = styled.nav`
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: ${c.BASE};
  }
`

const Menu = ({ tickets, immediate }) => {
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
  ]

  const linkMenu = useTransition(menu, item => item.name, {
    from: {
      opacity: 0,
      transform: `translateX(10%)`,
    },
    enter: {
      opacity: 1,
      transform: `translateX(0%)`,
    },
    trail: 200,
    immediate,
  })
  return (
    <MenuWrapper>
      {linkMenu.map(({ item, key, props }) => {
        const external = item.link.indexOf("//") === 0
        const ComponentLink = external ? ExternalMenuLink : MenuLink
        return (
          <animated.div key={key} style={props}>
            <ComponentLink to={item.link}>{item.name}</ComponentLink>
          </animated.div>
        )
      })}
    </MenuWrapper>
  )
}

export default Menu
