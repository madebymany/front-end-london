import React from "react"
import styled from "styled-components"
import Pagination from "react-paginating"

import { SimpleLink } from "../Links"
import c from "../../styles/constants"

const PaginationWrapper = styled.ul`
  width: 100%;
  text-align: center;
  font-size: ${c.LARGE};
`

const LinkArrow = styled(SimpleLink)`
  color: ${c.ORANGE};
`

const LinkWrapper = styled.li`
  display: inline-block;
  padding: 0 ${c.SMALL};
`

const generatePathFactory = path => page => {
  return page === 1 ? path : `${path}/${page}/`
}

const Paginator = ({ numPages, currentPage, pathPrefix }) => {
  const generatePath = generatePathFactory(pathPrefix)
  return (
    <Pagination
      total={numPages}
      limit={1}
      pageCount={9}
      currentPage={currentPage}
    >
      {({ pages, hasNextPage, hasPreviousPage }) => (
        <PaginationWrapper>
          {hasPreviousPage && (
            <LinkWrapper>
              <LinkArrow to={generatePath(currentPage - 1)}>&lt;</LinkArrow>
            </LinkWrapper>
          )}
          {pages.map(page => (
            <LinkWrapper key={page}>
              <SimpleLink
                to={generatePath(page)}
                activeStyle={{ color: c.ORANGE }}
              >
                {page}
              </SimpleLink>
            </LinkWrapper>
          ))}
          {hasNextPage && (
            <LinkWrapper>
              <LinkArrow to={generatePath(currentPage + 1)}>&gt;</LinkArrow>
            </LinkWrapper>
          )}
        </PaginationWrapper>
      )}
    </Pagination>
  )
}

export default Paginator
