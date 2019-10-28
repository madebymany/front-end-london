import React from "react"
import styled, { css } from "styled-components"
import { format } from "date-fns"

import { Strap, Copy, Notification, FinePrint } from "../Text"
import { MonoArrowLink, ExternalCopyLink } from "../Links"

import { medium, large } from "../../styles/media"
import c from "../../styles/constants"

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${medium(css`
    flex-direction: row;

    div + div {
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
        <ExternalCopyLink to="https://www.eventbrite.com/o/made-by-many-3064262734">
          eventbrite
        </ExternalCopyLink>
      </Notification>
    )}
    <Strap>Event Details</Strap>
    <Copy>
      On the last Thursday of every month, we bring people together for a range
      of exciting (and free!) talks on topics relating to digital product
      development. We welcome everyone, no matter what stage you're at in your
      career. The FEL community is inclusive and thrives on being inspired, we
      invite you to come and share your knowledge and meet new people.
    </Copy>
    <Copy>
      Whether you come for the pizza and drinks* or decide to sign up as a
      speaker, you are all invited to finish up the evening with a trip to our
      local pub!
    </Copy>
    <FinePrint>
      *Veggie/vegan food options and non-alcoholic drink options are always
      catered for.
    </FinePrint>
    <LinkGroup>
      <div>
        <MonoArrowLink to="/conduct/">Code of conduct</MonoArrowLink>
      </div>
      <div>
        <MonoArrowLink to="/#give-a-talk">Give a talk at FEL</MonoArrowLink>
      </div>
    </LinkGroup>
  </EventSummaryWrapper>
)

export default EventSummary
