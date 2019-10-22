import React from "react"
import styled from "styled-components"

import { FormInput } from "../Forms"
import SearchIcon from "../../../assets/icons/search.svg"

import c from "../../styles/constants"

const Form = styled.form`
  position: relative;
  width: 100%;

  input[type="search"] {
    padding-left: ${c.XL6};
  }
`

const IconWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 14px;
  width: 26px;
  height: 26px;
`

const SearchForm = ({
  formProps,
  onFocus,
  onSubmit,
  onChange,
  defaultValue,
  inputRef,
  mobile,
}) => (
  <Form {...formProps} onSubmit={onSubmit} mobile={mobile}>
    <IconWrapper>
      <SearchIcon />
    </IconWrapper>
    <FormInput
      ref={inputRef}
      type="search"
      name="s"
      placeholder="Search for a speaker's name, talk or date"
      onChange={onChange}
      onFocus={onFocus}
      defaultValue={defaultValue}
      autoComplete="off"
    />
  </Form>
)

export default SearchForm
