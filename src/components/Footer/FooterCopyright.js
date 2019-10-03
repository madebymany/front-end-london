import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import Container from "../Container"
import { FinePrint } from "../Text"
import { CopyLink } from "../Links"
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
  }

  img {
    width: auto;
    height: 25px;
  }
`

const FooterCopyright = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          socialLinks {
            icon
            link
          }
        }
      }
    }
  `)

  const socialLinks =
    data.site.siteMetadata && data.site.siteMetadata.socialLinks
  return (
    <Wrapper>
      <Container>
        <FooterRow>
          <Column md={0.5}>
            <FinePrint>
              © 2018 Made by Many Holdings Limited · Registered Company Number:
              7669932
              <br />
              We are using cookies on this site. For more information read our{" "}
              <CopyLink to="/privacy-policy">Privacy Policy</CopyLink>
            </FinePrint>
          </Column>
          <Column md={0.5}>
            <SocialMenu>
              {socialLinks &&
                socialLinks.map(item => (
                  <SocialItem key={item.icon}>
                    <a href={item.link}>
                      <img
                        src={item.icon}
                        alt={`Frontend London @ ${item.brand}`}
                      />
                    </a>
                  </SocialItem>
                ))}
            </SocialMenu>
          </Column>
        </FooterRow>
      </Container>
    </Wrapper>
  )
}

export default FooterCopyright
