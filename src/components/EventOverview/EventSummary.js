import React from "react"
import styled, { css } from "styled-components"
import { format } from "date-fns"

import { Strap, Copy, Notification } from "../Text"
import { MonoArrowLink, ExternalCopyLink } from "../Links"

import { medium, large } from "../../styles/media"
import c from "../../styles/constants"

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${medium(css`
    flex-direction: row;

    ${MonoArrowLink} + ${MonoArrowLink} {
      margin-left: 74px;
    }
  `)}
`

const EventSummaryWrapper = styled.div`
  margin-top: ${c.XL6};

  ${large`
    margin-top: 0;
  `}
`

const EventSummary = ({ availability, tickets_released }) => (
  <EventSummaryWrapper>
    {!availability && tickets_released && (
      <Notification>
        Tickets will be released on {format(tickets_released, "EEEE, MMMM d")},
        in two batches: 10am & 4pm. Tickets will be available on{" "}
        <ExternalCopyLink href="https://www.eventbrite.com/o/made-by-many-3064262734">
          eventbrite
        </ExternalCopyLink>
      </Notification>
    )}
    <Strap>Event Details</Strap>
    <Copy>
      We aim to provide a variety of interesting talks on peoples’ experiences
      in front-end development. Previously we’ve had talks on process, tooling,
      performance and technology, to name a few. Expect more of the same and
      lots more.
    </Copy>
    <Copy>
      To kick off the evening there’s pizza (with veggie/vegan options) and
      refreshments (wine/beer/soft drinks/etc). All finished up with an
      obligatory trip to the local pub — if that’s your kind of thing.
    </Copy>
    <LinkGroup>
      <MonoArrowLink to="/code-of-conduct/">Code of conduct</MonoArrowLink>
      <MonoArrowLink to="/request-a-refund/">Request a refund</MonoArrowLink>
    </LinkGroup>
  </EventSummaryWrapper>
)

export default EventSummary
