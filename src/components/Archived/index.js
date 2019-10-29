import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Engine from "./Engine"

const Archive = ({ talks, index, defaultQuery }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "placeholder.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Engine
      talks={talks}
      chunk={6}
      index={index}
      defaultQuery={defaultQuery}
      placeholder={data.file.childImageSharp.fluid}
    />
  )
}

export default Archive
