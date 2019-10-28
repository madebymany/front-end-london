import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled, { css } from "styled-components"
import jsonp from "jsonp"

import HoneyPot from "./HoneyPot"

import { Row, Column } from "../Grid"
import { Button } from "../Button"
import { Text } from "../Text"
import { ExternalCopyLink } from "../Links"
import { FormInput, FormCheckBox } from "../Forms"

import { medium } from "../../styles/media"
import c from "../../styles/constants"

const order = css`
  order: 1;

  ${medium`
    order: 0;
  `}
`

const ButtonColumn = styled(Column)`
  margin-bottom: ${c.XL2};

  ${medium`
    text-align: right;
    margin-left: 30px;
    margin-bottom: 0;
  `}

  ${order}
`

const CopyColumn = styled(Column)`
  ${order}
`

const HiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

const StatusMessage = styled(Text)`
  width: 100%;
  color: ${props => (props.theme.status === "error" ? c.ERROR : c.SUCCESS)};
`

const NewsletterForm = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          privacyPolicy
        }
      }
    }
  `)

  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState(false)
  const [message, setMessage] = useState("")

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        if (!consent) {
          setStatus("error")
          setMessage("Please consent to receive emails from Made by Many.")
          return
        }
        const form = event.target

        // Check Honeypot
        const checks = ["b_name", "b_email", "b_comment"]
          .map(key => form[key].value)
          .filter(value => value !== "")

        if (checks.length) {
          setStatus("error")
          setMessage("Invalid submission :(")
          return
        }

        setStatus(false)
        setMessage("")

        const data = {
          u: "2069e586d651ff50b3844c372",
          id: "12bc29b23c",
          EMAIL: form.email.value,
          "gdpr[1877]": form.gdpr.checked ? form.gdpr.value : "",
        }

        const params = new URLSearchParams()
        Object.keys(data).forEach(key => params.set(key, data[key]))

        jsonp(
          `https://madebymany.us6.list-manage.com/subscribe/post-json?${params.toString()}`,
          {
            param: "c",
          },
          (err, data) => {
            if (err) {
              setStatus("error")
              setMessage(err)
              return
            }
            setStatus(data.result !== "success" ? "error" : "success")
            const cleanMessage = data.msg
              .replace("0 - ", "")
              .replace(/<a href.*?\/a>/g, "")
              .trim()

            setMessage(cleanMessage)
          }
        )
      }}
    >
      <HoneyPot />
      <Row>
        <Column md={0.73}>
          <HiddenLabel htmlFor="email">Email Address</HiddenLabel>
          <FormInput
            id="email"
            type="email"
            name="EMAIL"
            placeholder="Email Address"
            autoCapitalize="off"
            autoCorrect="off"
          />
        </Column>
        <ButtonColumn md={0.22}>
          <Button type="submit" primary block>
            Sign up
          </Button>
        </ButtonColumn>
        <Column md={1}>
          <FormCheckBox
            id="gdpr"
            label="I consent to receiving email newsletters from Made by Many"
            type="checkbox"
            checked={consent}
            name="gdpr"
            value="Y"
            onChange={event => {
              setConsent(event.target.checked)
            }}
          />
        </Column>
        <CopyColumn md={0.73}>
          <Text>
            We don’t want any funny business, we want to be clear about the data
            we collect and how we use it. To find out the details click{" "}
            <ExternalCopyLink to={data.site.siteMetadata.privacyPolicy}>
              here
            </ExternalCopyLink>
          </Text>
        </CopyColumn>
        {message && <StatusMessage theme={{ status }}>{message}</StatusMessage>}
      </Row>
    </form>
  )
}

export default NewsletterForm
