import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { css } from "styled-components"
import { format } from "date-fns"

import { Strap, Copy, Notification } from "../Text"
import {
  ExternalMonoArrowLink,
  MonoArrowLink,
  ExternalCopyLink,
} from "../Links"

import { medium, large } from "../../styles/media"
import c from "../../styles/constants"

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${medium(css`
    flex-direction: row;

    a + a {
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

const EventSummary = ({ availability, tickets_released }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          returnTickets
        }
      }
    }
  `)
  return (
    <EventSummaryWrapper>
      {!availability && tickets_released && (
        <Notification>
          Tickets will be released on {format(tickets_released, "EEEE, MMMM d")}
          , in two batches: 10am & 4pm. Tickets will be available on{" "}
          <ExternalCopyLink to="https://www.eventbrite.com/o/made-by-many-3064262734">
            eventbrite
          </ExternalCopyLink>
        </Notification>
      )}
      <Strap>Event Details</Strap>
      <Copy>
        We aim to provide a variety of interesting talks on peoples’ experiences
        in front-end development. Previously we’ve had talks on process,
        tooling, performance and technology, to name a few. Expect more of the
        same and lots more.
      </Copy>
      <Copy>
        To kick off the evening there’s pizza (with veggie/vegan options) and
        refreshments (wine/beer/soft drinks/etc). All finished up with an
        obligatory trip to the local pub — if that’s your kind of thing.
      </Copy>
      <LinkGroup>
        <MonoArrowLink to="/conduct/">Code of conduct</MonoArrowLink>
        {data.site.siteMetadata && data.site.siteMetadata.returnTickets && (
          <ExternalMonoArrowLink to="https://www.eventbrite.com/support/articles/en_US/How_To/how-to-cancel-your-free-registration">
            Return tickets
          </ExternalMonoArrowLink>
        )}
      </LinkGroup>
    </EventSummaryWrapper>
  )
}

export default EventSummary
