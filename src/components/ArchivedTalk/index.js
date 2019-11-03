import React, { useState } from "react"
import styled, { css, keyframes } from "styled-components"
import Img from "gatsby-image"

import { Row, Column } from "../Grid"
import { Strap, Heading, Copy } from "../Text"
import { ExternalMonoArrowLink, ExternalLink } from "../Links"

import ResourceLinks from "./ResourceLinks"

import { medium } from "../../styles/media"
import c from "../../styles/constants"

import Options from "../../../assets/icons/options.svg"

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const TalkWrapper = styled.div`
  background-color: ${c.WHITE};
  padding: 0;
  animation: ${fadeIn} 1s;

  ${medium(css`
    border-top: 1px solid ${c.GREY};
    padding: ${c.XL6} 0;
  `)}
`

const Preview = styled.a`
  position: relative;
  display: flex;
  width: calc(100% + (${c.BASE} * 2));
  margin-left: -${c.BASE};
  margin-right: -${c.BASE};

  ${medium`
    width: 100%;
    margin: 0;
  `}

  .gatsby-image-wrapper {
    width: 100%;
  }

  a&:before,
  a&:after {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 40px;
    z-index: 1;

    ${medium`
      content: "";
    `}
  }

  a&:before {
    background-color: ${c.ORANGE};
  }

  a&:after {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='12' height='14' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M11.97 6.97l-11.94 7v-14z' fill='%23FFF' fill-rule='evenodd'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
`

const TalkHeading = styled(Heading)`
  margin: 0 0 0.75rem 0;
  line-height: 1.1;

  ${medium(css`
    margin: 0.6rem 0 1.4rem 0;
  `)}
`

const PaddedColumn = styled(Column)`
  padding: ${c.XL3} 0;

  ${Copy} {
    padding-top: ${c.BASE};
  }

  &:first-child {
    border-top: 1px solid ${c.GREY};
    padding-top: ${c.XL6};
    padding-left: 0;
    padding-right: 0;

    ${medium`
      border: none;
      padding-top: 0;
    `}
  }

  ${medium(css`
    padding-top: 0;
    padding-bottom: 0;
    padding-left: ${c.XL6};

    ${Copy} {
      padding-top: 0;
    }
  `)}
`

const ContentWrapper = styled.div`
  position: relative;

  ${medium`
    margin-top: -9px;
  `}

  ${Strap} {
    margin-right: ${c.XL5};

    ${medium`
      margin-right: 0;
    `}
  }

  ${TalkHeading}:last-child {
    padding-bottom: ${c.BASE};
  }
`

const OptionsButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -8px;
  right: 0;
  padding: ${c.SMALL} ${c.BASE};
  background: transparent;
  border: none;

  ${medium`
    display: none;
  `}
`

const ArchivedTalk = ({
  date,
  name,
  topic,
  twitter,
  description,
  poster,
  video_url,
  slides_url,
  placeholder,
}) => {
  const [showLinks, setLinks] = useState(false)
  return (
    <TalkWrapper>
      <Row>
        <Column md={0.27}>
          {poster ? (
            <Preview href={video_url} target="_blank" rel="noopener norefferer">
              <Img
                fluid={poster.childImageSharp.fluid}
                alt={`${topic} by ${name}`}
              />
            </Preview>
          ) : (
            <Preview as="div">
              <Img fluid={placeholder} alt={`${topic} by ${name}`} />
            </Preview>
          )}
        </Column>
        <PaddedColumn md={0.73}>
          <ContentWrapper>
            <Strap>
              {date}&nbsp;&nbsp;·&nbsp;&nbsp;{name}
              {twitter && (
                <>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <ExternalLink to={`https://twitter.com/${twitter}`}>
                    @{twitter}
                  </ExternalLink>
                </>
              )}
            </Strap>
            <TalkHeading>{topic}</TalkHeading>
            {description && <Copy>{description}</Copy>}
            {(video_url || slides_url) && (
              <>
                <OptionsButton
                  onClick={() => setLinks(true)}
                  ariaLabel="Open resource links"
                >
                  <Options />
                </OptionsButton>
                <ResourceLinks open={showLinks} setOpen={setLinks}>
                  {video_url && (
                    <ExternalMonoArrowLink to={video_url}>
                      Watch video
                    </ExternalMonoArrowLink>
                  )}
                  {slides_url && (
                    <ExternalMonoArrowLink to={slides_url}>
                      View slides
                    </ExternalMonoArrowLink>
                  )}
                </ResourceLinks>
              </>
            )}
          </ContentWrapper>
        </PaddedColumn>
      </Row>
    </TalkWrapper>
  )
}

export default ArchivedTalk
