import React from "react"
import styled from "styled-components"

const Hidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

const HoneyPot = () => (
  <Hidden aria-label="Please leave the following three fields empty">
    <label htmlFor="b_name">Name: </label>
    <input
      type="text"
      name="b_name"
      tabIndex="-1"
      defaultValue=""
      placeholder="Freddie"
      id="b_name"
    />

    <label htmlFor="b_email">Email: </label>
    <input
      type="email"
      name="b_email"
      tabIndex="-1"
      defaultValue=""
      placeholder="youremail@gmail.com"
      id="b_email"
    />

    <label htmlFor="b_comment">Comment: </label>
    <textarea
      name="b_comment"
      tabIndex="-1"
      placeholder="Please comment"
      id="b_comment"
    ></textarea>
  </Hidden>
)

export default HoneyPot
