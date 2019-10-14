import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

import { Heading, Copy } from "../Text"
import { MobileModal } from "../Modal"
import SearchForm from "./SearchForm"

import { medium } from "../../styles/media"
import c from "../../styles/constants"

import SearchIcon from "../../../assets/images/icons/search.svg"

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: ${c.LARGE};

  ${props => props.copyInline && "flex-wrap: wrap;"}
`

const SearchHeading = styled(Heading)`
  display: inline-block;
  margin-bottom: 0;

  ${props =>
    props.copyInline &&
    `
    display: inline-block;
    width: 100%;
  `}

  ${medium`
    display: block;
  `}
`

const SearchButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${c.BASE};
  right: 0;
  padding: 5px;
  background: transparent;
  border: none;
  cursor: pointer;

  ${medium`
    display: none;
  `}
`

const SearchCopy = styled(Copy)`
  margin-bottom: 0;

  ${props =>
    !props.copyInline &&
    css`
      margin-left: ${c.BASE};
      margin-bottom: 1px;
      ${medium`
        margin-left: 0;
        margin-bottom: 0;
      `}
    `}

  ${medium(css`
    margin-bottom: ${c.BASE};
  `)}
`

const FormWrapper = styled.div`
  display: none;
  width: 100%;

  ${medium(css`
    display: block;
    margin-bottom: ${c.XL5};
  `)}

  .focus-trap & {
    display: block;
  }
`

const SearchHeader = ({
  heading,
  defaultValue,
  formProps,
  onChange,
  onSubmit,
  copy,
  copyInline,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const searchRef = useRef(null)

  const forwardOnSubmit = event => {
    setOpen(false)
    if (onSubmit) {
      onSubmit(event)
    }
  }
  return (
    <HeaderWrapper copyInline={copyInline} {...props}>
      <SearchHeading as="h1" copyInline={copyInline}>
        {heading}
      </SearchHeading>
      <SearchButton onClick={() => setOpen(true)}>
        <img src={SearchIcon} alt="Open search" />
      </SearchButton>
      <MobileModal
        open={open}
        setOpen={setOpen}
        align="flex-start"
        direction="down"
        mobileOnly
      >
        <FormWrapper>
          <SearchForm
            formProps={formProps}
            onChange={onChange}
            onSubmit={forwardOnSubmit}
            inputRef={searchRef}
            defaultValue={defaultValue}
          />
        </FormWrapper>
      </MobileModal>
      {copy && <SearchCopy copyInline={copyInline}>{copy}</SearchCopy>}
    </HeaderWrapper>
  )
}

SearchHeader.propTypes = {
  copy: PropTypes.string,
  copyInline: PropTypes.bool,
  defaultValue: PropTypes.string,
  formProps: PropTypes.shape({
    action: PropTypes.string,
    method: PropTypes.string,
  }),
  heading: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
}

SearchHeader.defaultProps = {
  copy: "",
  copyInline: false,
  defaultValue: "",
  formProps: null,
  onChange: null,
  onSubmit: null,
}

export default SearchHeader
