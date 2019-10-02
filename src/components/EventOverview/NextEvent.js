import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { format, parse, isPast } from "date-fns"
import c from "../../styles/constants"
import { Strap } from "../Text"
import { Button } from "../Button"
import { MonoArrowLink } from "../Links"

const TimeHeading = styled.time`
  font-weight: ${c.BOLD};
  font-size: ${c.XL6};
`

const Address = styled.address`
  font-style: normal;
  margin-bottom: ${c.XL5};
  p {
    margin: 0;
  }
`

const NextEvent = ({ availability, date, registration_url }) => (
  <div>
    <Strap>Next Event</Strap>
    {date ? (
      <TimeHeading dateTime={format(date, "yyyy-MM-dd HH:mm")}>
        {format(date, "do MMM '‘'yy")}
      </TimeHeading>
    ) : (
      <TimeHeading as="span">TBC</TimeHeading>
    )}
    <Address>
      <p>Made by Many office</p>
      <p>38 Graham Street</p>
      <p>London N1 8JX</p>
    </Address>
    {registration_url && availability && (
      <Button as="a" primary href={registration_url}>
        Get tickets
      </Button>
    )}
  </div>
)

export default NextEvent
