import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { darken } from "polished"

import Container from "../Container"
import { FinePrint } from "../Text"
import { ExternalCopyLink } from "../Links"
import { Row, Column } from "../Grid"

import { medium } from "../../styles/media"
import c from "../../styles/constants"

const Wrapper = styled.div`
  padding-top: ${c.XL};
`

const SocialMenu = styled.ul`
  display: flex;
  padding-bottom: ${c.XS};

  ${medium`
    justify-content: flex-end;
  `}
`

const FooterRow = styled(Row)`
  flex-direction: column-reverse;

  ${medium`
    flex-direction: row;
  `}
`

const SocialItem = styled.li`
  & + & {
    margin-left: ${c.BASE};
  }

  a {
    line-height: 0;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${c.ORANGE};
    }

    &:focus {
      outline: 0;
      color: ${darken(0.05, c.ORANGE)};
    }
  }

  svg {
    width: auto;
    height: 25px;
    fill: currentColor;
  }
`

const FooterCopyright = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          socialLinks {
            brand
            icon
            link
          }
          privacyPolicy
        }
      }
    }
  `)

  const socialLinks =
    data.site.siteMetadata && data.site.siteMetadata.socialLinks
  const privacyPolicy =
    data.site.siteMetadata && data.site.siteMetadata.privacyPolicy
  return (
    <Wrapper>
      <Container>
        <FooterRow>
          <Column md={0.8}>
            <FinePrint>
              © 2018 Made by Many Holdings Limited · Registered Company Number:
              7669932
              <br />
              We are using cookies on this site. For more information read our{" "}
              <ExternalCopyLink to={privacyPolicy}>
                Privacy Policy
              </ExternalCopyLink>
            </FinePrint>
          </Column>
          <Column md={0.2}>
            <SocialMenu>
              {socialLinks &&
                socialLinks.map(item => {
                  const Icon = require(`../../../assets/icons/${item.icon}`)
                  return (
                    <SocialItem key={item.icon}>
                      <a
                        href={item.link}
                        aria-label={`Frontend London @ ${item.brand}`}
                      >
                        <Icon />
                      </a>
                    </SocialItem>
                  )
                })}
            </SocialMenu>
          </Column>
        </FooterRow>
      </Container>
    </Wrapper>
  )
}

export default FooterCopyright
