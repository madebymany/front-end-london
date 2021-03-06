import React from "react"
import styled, { css } from "styled-components"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import DelayMount from "../DelayMount"
import { Row, Column } from "../Grid"
import { Strap, Heading, Copy } from "../Text"
import { ExternalLink } from "../Links"
import Blob from "../Blob"

import { medium } from "../../styles/media"
import c from "../../styles/constants"

const Wrapper = styled(Row)`
  padding: ${c.XL2} 0;
  border-bottom: 1px solid ${c.GREY};

  ${medium(css`
    padding: ${c.XL7} 0;
  `)}
`

const PaddedXColumn = styled(Column)`
  padding: ${c.XL} ${c.BASE};
  transform: translateX(-25%);

  ${medium(css`
    padding: 0 ${c.BASE};
    transform: translateX(0%);
  `)}
`

const SpeakerHeading = styled(Heading)`
  ${medium`
    margin: 0.6rem 0 1.4rem 0;
  `}
`

const renderDescription = paragraphs =>
  paragraphs.map((p, i) => <Copy key={i}>{p}</Copy>)

const Speaker = ({ name, twitter, topic, description, pic }) => {
  const descriptionParagraphs = description.match(/[^\r\n]+/g)

  return (
    <Wrapper>
      <PaddedXColumn xs={0.8} md={0.3}>
        <DelayMount>
          <Blob fill={c.WHITE} transform="scale(1.3)">
            <Img fluid={pic.childImageSharp.fluid} alt={name} />
          </Blob>
        </DelayMount>
      </PaddedXColumn>
      <Column md={0.7}>
        <Strap>
          {name}
          {twitter && (
            <>
              &nbsp;&nbsp;·&nbsp;&nbsp;
              <ExternalLink to={`https://twitter.com/${twitter}`}>
                @{twitter}
              </ExternalLink>
            </>
          )}
        </Strap>
        <SpeakerHeading>{topic}</SpeakerHeading>
        {renderDescription(descriptionParagraphs)}
      </Column>
    </Wrapper>
  )
}

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
        fluid(maxWidth: 600, maxHeight: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Speaker
