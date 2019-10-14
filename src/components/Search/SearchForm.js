import React from "react"
import styled from "styled-components"

import { FormInput } from "../Forms"
import SearchIcon from "../../../assets/images/icons/search.svg"

import c from "../../styles/constants"

const Form = styled.form`
  position: relative;
  width: 100%;

  input[type="search"] {
    padding-left: ${c.XL6};
  }

  &:after {
    content: "";
    position: absolute;
    width: ${c.XL6};
    height: 100%;
    top: 0;
    background-image: url(${SearchIcon});
    background-size: 26px 26px;
    background-position: center center;
    background-repeat: no-repeat;
  }
`

const SearchForm = ({
  formProps,
  onSubmit,
  onChange,
  defaultValue,
  inputRef,
  mobile,
}) => (
  <Form {...formProps} onSubmit={onSubmit} mobile={mobile}>
    <FormInput
      ref={inputRef}
      type="search"
      name="s"
      placeholder="Search for a speaker's name, talk or date"
      onChange={onChange}
      defaultValue={defaultValue}
    />
  </Form>
)

export default SearchForm
