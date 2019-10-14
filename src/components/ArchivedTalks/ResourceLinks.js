import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { MobileModal } from "../Modal"
import { ExternalMonoArrowLink } from "../Links"

import { medium } from "../../styles/media"
import c from "../../styles/constants"

const ResourceGroup = styled.div`
  display: none;

  ${medium`
    display: block;
  `}

  .focus-trap & {
    display: block;
    
    ${ExternalMonoArrowLink} {
      width: 100%;
      display: block;
      background: ${c.WHITE};
      padding: ${c.XL};
      z-index: 1;

      &:focus {
        outline: none;
        text-decoration: underline;
      }
    }
  }

  ${ExternalMonoArrowLink} + ${ExternalMonoArrowLink} {
    border-top: 1px solid ${c.GREY};
    ${medium`
      border: none;
      margin-left: 74px;
    `}
  }
`

const ResourceLinks = ({ open, setOpen, children }) => {
  return (
    <MobileModal
      open={open}
      setOpen={setOpen}
      align="flex-end"
      direction="up"
      mobileOnly
    >
      <ResourceGroup>{children}</ResourceGroup>
    </MobileModal>
  )
}

ResourceLinks.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default ResourceLinks
