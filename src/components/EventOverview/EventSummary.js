import React from "react"
import styled from "styled-components"
import { format } from "date-fns"

import { Strap, Copy, Notification } from "../Text"
import { MonoArrowLink, ExternalCopyLink } from "../Links"

const LinkGroup = styled.div`
  ${MonoArrowLink} + ${MonoArrowLink} {
    margin-left: 74px;
  }
`

const EventSummary = ({ availability, tickets_released }) => (
  <div>
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
      <MonoArrowLink to="/code-of-conduct">Code of conduct</MonoArrowLink>
      <MonoArrowLink to="/request-a-refund">Request a refund</MonoArrowLink>
    </LinkGroup>
  </div>
)

export default EventSummary
