import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"
import { format } from "date-fns"
import { Strap } from "../Text"
import { Button } from "../Button"
import { medium } from "../../styles/media"
import c from "../../styles/constants"

const TimeHeading = styled.time`
  display: block;
  font-weight: ${c.BOLD};
  font-size: ${c.XL4};
  line-height: 1;
  margin-bottom: ${c.BASE};

  ${medium(css`
    font-size: ${c.XL6};
  `)}
`

const Address = styled.address`
  font-style: normal;
  margin-bottom: ${c.XL5};
  p {
    margin: 0;
  }
`

const TicketButton = styled(Button)`
  display: block;
  width: 100%;

  ${medium`
    display: inline-block;
    width: auto;
  `}
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
      <TicketButton as="a" primary href={registration_url}>
        Get tickets
      </TicketButton>
    )}
  </div>
)

export default NextEvent
