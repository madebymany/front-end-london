import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import c from "../../styles/constants"

import { Row, Column } from "../Grid"
import { Strap, Heading, Copy } from "../Text"
import { ExternalLink } from "../Links"
import Blob from "../Blob"

const Wrapper = styled(Row)`
  padding: ${c.XL7} 0;
  border-bottom: 1px solid ${c.GREY};
`

const PaddedXColumn = styled(Column)`
  padding: 0 ${c.BASE};
`

const Speaker = ({ name, twitter, topic, description, pic }) => (
  <Wrapper>
    <PaddedXColumn xs={1} md={0.3}>
      <Blob
        complexity={0.3}
        contrast={0.4}
        fill={c.WHITE}
        transform="scale(1.1, 1.4)"
      >
        <Img fluid={pic.childImageSharp.fluid} alt={name} />
      </Blob>
    </PaddedXColumn>
    <Column xs={1} md={0.7}>
      <Strap>
        {name}
        {twitter && (
          <>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <ExternalLink href={`https://twitter.com/${twitter}`}>
              @{twitter}
            </ExternalLink>
          </>
        )}
      </Strap>
      <Heading>{topic}</Heading>
      <Copy>{description}</Copy>
    </Column>
  </Wrapper>
)

export const fragment = graphql`
  fragment Speaker on EventsJsonSpeakers {
    name
    company
    description
    twitter
    topic
    description
    pic {
      childImageSharp {
        fluid(maxWidth: 330, maxHeight: 380) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Speaker
