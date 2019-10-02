import React from "react"
import styled from "styled-components"

import { Row, Column } from "../Grid"
import { Button } from "../Button"
import { Text } from "../Text"
import { ExternalCopyLink } from "../Links"
import { FormInput, FormCheckBox } from "../Forms"

const ButtonColumn = styled(Column)`
  text-align: right;
  margin-left: 30px;
`

const NewsletterForm = () => (
  <form action="https://madebymany.us6.list-manage.com/subscribe?u=2069e586d651ff50b3844c372&id=12bc29b23c">
    <Row>
      <Column md={0.73}>
        <FormInput id="email" type="email" placeholder="Email Address" />
      </Column>
      <ButtonColumn md={0.22}>
        <Button type="submit" primary block>
          Sign up
        </Button>
      </ButtonColumn>
      <Column md={1}>
        <FormCheckBox
          id="consent"
          label="I consent to receiving email newsletters from Made by Many"
          type="checkbox"
        />
      </Column>
      <Column md={0.73}>
        <Text>
          We don’t want any funny business, we want to be clear about the data
          we collect and how we use it. To find out the details click{" "}
          <ExternalCopyLink href="https://www.iubenda.com/privacy-policy/92517840">
            here
          </ExternalCopyLink>
        </Text>
      </Column>
    </Row>
  </form>
)

export default NewsletterForm
