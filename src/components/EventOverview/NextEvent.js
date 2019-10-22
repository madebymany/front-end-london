import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"
import { format } from "date-fns"
import { Strap, Copy } from "../Text"
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

const Address = styled(Copy)`
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
        {format(date, "dd MMM '‘'yy")}
      </TimeHeading>
    ) : (
      <TimeHeading as="span">TBC</TimeHeading>
    )}
    <Address as="address">
      <p>Made by Many office</p>
      <p>38 Graham Street</p>
      <p>London N1 8JX</p>
    </Address>
    {registration_url && availability && (
      <TicketButton
        as="a"
        primary
        href={registration_url}
        target="_blank"
        rel="noopener"
      >
        Get tickets
      </TicketButton>
    )}
  </div>
)

NextEvent.propTypes = {
  availability: PropTypes.bool.isRequired,
  date: PropTypes.oneOfType([PropTypes.bool, PropTypes.instanceOf(Date)]),
  registration_url: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

NextEvent.defaultProps = {
  date: false,
  registration_url: false,
}

export default NextEvent
