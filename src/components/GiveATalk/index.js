import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import { Row, Column } from "../Grid"
import Container from "../Container"
import { medium } from "../../styles/media"
import c from "../../styles/constants"

import GiveATalkContent from "./GiveATalkContent"
import GiveATalkImage from "./GiveATalkImage"

const Wrapper = styled(Container)`
  position: relative;
  padding-top: ${c.XL5};
  padding-bottom: ${c.XL5};
`

const TalkRow = styled(Row)`
  flex-direction: column-reverse;
  ${medium`
    flex-direction: row;
  `}
`

const GiveATalk = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "fel-audience.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Wrapper>
      <TalkRow>
        <Column lg={0.43}>
          <GiveATalkContent />
        </Column>
        <Column lg={0.57}>
          <GiveATalkImage image={data.file.childImageSharp.fluid} />
        </Column>
      </TalkRow>
    </Wrapper>
  )
}

export default GiveATalk
