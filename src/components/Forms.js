import React from "react"
import styled from "styled-components"
import { rgba } from "polished"

import c from "../styles/constants"

export const FormInput = styled.input`
  display: block;
  width: 100%;
  padding: ${c.XS};
  font-size: ${c.XL2};
  line-height: 1.74;
  background-color: ${c.WHITE};
  background-clip: padding-box;
  border: 1px solid ${c.GREY};
  transition: box-shadow 0.15s ease-in-out;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${rgba(c.ORANGE, 0.2)};
  }
`

const FormCheckLabel = styled.label`
  position: relative;
  display: flex;
  margin: ${c.XL5} 0;
  cursor: pointer;
`

const FormCheckInput = styled.input.attrs(() => ({
  type: "checkbox",
}))`
  position: absolute;
  opacity: 0;
`

const FormCheckButton = styled.span`
  display: flex;
  border: 1px solid ${c.GREY};
  background: ${c.WHITE};
  flex: 0 0 30px;
  height: 30px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.15s ease-in-out;

  &:after {
    content: "";
    display: block;
    width: 6px;
    height: 12px;
    border: solid ${c.ORANGE};
    margin-top: -3px;
    border-width: 0;
    transition: transform 0.1s;
    border-width: 0 2px 2px 0;
    transform: scale(0) rotate(0);
  }

  input:focus + & {
    box-shadow: 0 0 0 0.2rem ${rgba(c.ORANGE, 0.2)};
  }

  input:checked ~ &:after {
    transform: scale(1) rotate(45deg);
  }
`

const FormCheckText = styled.span`
  display: block;
  margin-left: ${c.BASE};
`

export const FormCheckBox = ({ id, label, ...props }) => (
  <FormCheckLabel htmlFor={id}>
    <FormCheckInput id={id} {...props} />
    <FormCheckButton />
    <FormCheckText>{label}</FormCheckText>
  </FormCheckLabel>
)
