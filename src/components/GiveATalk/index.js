import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import { Row, Column } from "../Grid"
import Container from "../Container"
import c from "../../styles/constants"

import GiveATalkContent from "./GiveATalkContent"
import GiveATalkImage from "./GiveATalkImage"

const Wrapper = styled(Container)`
  position: relative;
  padding: ${c.XL5} 0;
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
      <Row>
        <Column md={0.43}>
          <GiveATalkContent />
        </Column>
        <Column md={0.57}>
          <GiveATalkImage image={data.file.childImageSharp.fluid} />
        </Column>
      </Row>
    </Wrapper>
  )
}

export default GiveATalk
