import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Animated from "../layouts/Animated"
import SEO from "../components/seo"

import Newsletter from "../components/Newsletter"

import Container from "../components/Container"
import { Heading, Copy } from "../components/Text"
import { ExternalCopyLink } from "../components/Links"

import { medium } from "../styles/media"
import c from "../styles/constants"

const Tight = styled.div`
  width: 100%;
  max-width: 760px;
`

const Section = styled.section`
  & + & {
    margin-top: 60px;

    ${medium`
      margin-top: 180px;
    `}
  }

  &:last-child {
    ${medium`
      margin-bottom: 180px;
    `}
  }
`

const ConductPage = ({ data, ...rest }) => {
  return (
    <Animated {...rest} fill={c.WHITE}>
      <SEO title="Code of Conduct" />
      <Container>
        <Tight>
          <Section>
            <Heading as="h1">Code of conduct</Heading>
            <Copy>
              We are proud of the friendly community of people who attend Made
              by Many’s events. As an event participant, we trust that you will
              understand that this code of conduct is here to protect that
              atmosphere of inclusivity and ensure everyone continues to feel
              welcome and safe. We expect you to listen to and communicate with
              each other respectfully regardless of appearance or background.
            </Copy>
            <Copy>
              All attendees, speakers, sponsors, staff and volunteers at our
              events are required to agree with the following code of conduct.
              Organisers will enforce this code throughout our events. We are
              expecting cooperation from all participants to help ensuring a
              safe, fun environment for everybody.
            </Copy>
            <Copy>
              tl;dr:{" "}
              <ExternalCopyLink to="https://www.youtube.com/watch?v=N_yJFLvmjJY">
                Be excellent to each other
              </ExternalCopyLink>
            </Copy>
          </Section>
          <Section>
            <Heading>Need Help?</Heading>
            <Copy>
              If you have any questions, comments, complaints or suggestions -
              please don't hesitate to contact us us via{" "}
              <ExternalCopyLink to="mailto:fel@madebymany.co.uk">
                fel@madebymany.co.uk
              </ExternalCopyLink>{" "}
              or{" "}
              <ExternalCopyLink to="https://twitter.com/frontendlondon">
                @frontendlondon
              </ExternalCopyLink>
              . You can also phone the Made by Many studio on{" "}
              <ExternalCopyLink to="tel:+44-20-8133-8510">
                +44 (0)20 8133 8510
              </ExternalCopyLink>{" "}
              to speak to Andy, Rob, Gillian or Fiona or speak to any member of
              Made by Many team in person. We’ll listen to your concerns and
              take any necessary action promptly.
            </Copy>
          </Section>
          <Section>
            <Heading>Summary</Heading>
            <Copy>
              We’re dedicated to providing an inclusive and harassment-free
              experience for everyone attending Front-end London, regardless of
              gender, gender identity and expression, age, sexual orientation,
              disability, physical appearance, body size, race, ethnicity,
              religion (or lack thereof), or technology choices. We do not
              tolerate harassment of participants in any form. Sexual language
              and imagery is not appropriate for Front-end London events,
              including venues, talks, workshops, parties, Twitter and other
              online media relating to the event. Anyone attending or
              participating in the event who violates these rules will be asked
              to leave immediately and can be banned from future Made by Many
              events (e.g: Front End London, EpicFEL, Small Talks, Lean Day
              London, summer parties, etc).
            </Copy>
          </Section>
          <Section>
            <Heading>The details</Heading>
            <Copy>
              Harassment includes offensive verbal or written comments related
              to gender, gender identity and expression, age, sexual
              orientation, disability, physical appearance, body size, race,
              ethnicity, religion, technology choices, sexual images in public
              spaces, deliberate intimidation, stalking, following, harassing
              photography or recording, sustained disruption of talks or other
              events, inappropriate physical contact, and unwelcome sexual
              attention.
            </Copy>
            <Copy>
              We also have a general policy that we do not tolerate disruptive
              behavior including repeated interruption, inebriation (or similar
              intoxication), fighting and open aggression.
            </Copy>
            <Copy>
              Participants asked to stop any inappropriate or disruptive
              behavior are expected to comply immediately. If a participant’s
              engagement is problematic, Front-end London organisers may take
              any action they deem appropriate, including warning the offender
              or expulsion from the event without a refund.
            </Copy>
          </Section>
          <Section>
            <Heading>What to do if you have a concern</Heading>
            <Copy>
              If you are being harassed or feel uncomfortable, notice that
              someone else is being harassed, or have any other concerns, please
              contact a member of the event staff immediately on the email or
              phone number above, or speak to a Made by Many member of staff
              directly.
            </Copy>
            <Copy>
              Our team are here to listen to your concerns or questions, and you
              don’t have to make a formal report unless you want to. You do not
              have to give us details of the harassment. If you wish to report
              it, we will take details of the harassment and work with you to
              respond to the issue in a way that assists you in feeling safe. If
              necessary, our staff will help participants contact venue security
              (if at an external venue) or police, provide escorts, or otherwise
              assist those experiencing harassment to feel safe for the duration
              of the event.
            </Copy>
          </Section>
          <Section>
            <Heading>Where and when this code of conduct applies</Heading>
            <Copy>
              We’d be pleased if you tried to be a nice human all the time. In
              the case of this code of conduct, we expect participants to follow
              these rules at our studio space, at any external venue and related
              social events (for example, post-event pub drinks, networking
              discussions, meet-ups and workshops). Any sponsors are also
              subject to this anti-harassment policy. In particular, sponsors
              should not use sexualised images, activities, or other material.
            </Copy>
          </Section>
          <Section>
            <Heading>Exceptions</Heading>
            <Copy>
              Discussion or images related to sex, pornography, discriminatory
              language, or similar is welcome if it meets all of the following
              criteria:
            </Copy>
            <Copy>
              <ol>
                <li>
                  The organisers have specifically granted permission in
                  writing.
                </li>
                <li>
                  It is necessary to the topic of discussion and no alternative
                  exists.
                </li>
                <li>
                  It is necessary to the topic of discussion and no alternative
                  exists.
                </li>
                <li>
                  Attendees are warned in advance and respectfully given ample
                  warning and opportunity to leave beforehand.
                </li>
              </ol>
            </Copy>
            <Copy>
              This exception specifically does not allow use of gratuitous
              sexual images as attention-getting devices or unnecessary
              examples.
            </Copy>
          </Section>
          <Section>
            <Heading>With thanks</Heading>
            <Copy>
              We’ve been influenced by and borrowed from{" "}
              <ExternalCopyLink to="https://nineworlds.co.uk/anti-harassment-policy">
                Nine Worlds
              </ExternalCopyLink>{" "}
              and{" "}
              <ExternalCopyLink to="http://blog.xoxofest.com/conduct">
                XOXO’s
              </ExternalCopyLink>{" "}
              codes of conduct. The latter was based on the work of{" "}
              <ExternalCopyLink to="http://jsconf.com/codeofconduct.html">
                JSConf
              </ExternalCopyLink>
              ,
              <ExternalCopyLink to="http://geekfeminism.wikia.com/wiki/Conference_anti-harassment/Policy">
                Geek Feminism
              </ExternalCopyLink>
              ,{" "}
              <ExternalCopyLink to="http://confcodeofconduct.com/">
                confcodeofconduct.com
              </ExternalCopyLink>
              , and inspired by resources provided by{" "}
              <ExternalCopyLink to="http://www.ashedryden.com/blog/codes-of-conduct-101-faq">
                Ashe Dryden
              </ExternalCopyLink>
              .
            </Copy>
          </Section>
        </Tight>
      </Container>
      <Newsletter />
    </Animated>
  )
}

export const query = graphql`
  query ConductPage($today: Float) {
    current: allEventsJson(
      sort: { fields: fields___timestamp, order: DESC }
      limit: 1
      filter: {
        fields: {
          timestamp: { gte: $today }
          ticket_timestamp: { lte: $today }
        }
      }
    ) {
      edges {
        node {
          registration_url
        }
      }
    }
  }
`

export default ConductPage
