import React from "react"
import { motion } from "framer-motion"
import styled, { css } from "styled-components"

import { large } from "../../styles/media"
import c from "../../styles/constants"

const Toggle = styled.button`
  display: flex;
  justify-content: center;
  width: 34px;
  height: 34px;
  color: currentColor;
  background: transparent;
  padding: 0;
  margin-top: 10px;
  border: 0px solid ${c.WHITE};

  ${large(css`
    display: none;
  `)}

  &:focus {
    outline: 0;
    border-width: 2px;
  }
`

const NavToggle = props => (
  <Toggle type="button" {...props}>
    <svg
      viewBox="0 0 24 20"
      width="24"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd">
        <motion.path
          d="M0,3 L24,3"
          initial={{ originX: "50%", originY: 3 }}
          variants={{
            closed: { rotate: 0, y: 0 },
            open: {
              rotate: -45,
              y: 7,
            },
          }}
        />
        <motion.path
          d="M0,10 L24,10"
          initial={false}
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <motion.path
          d="M0,17 L24,17"
          initial={{ originX: "50%", originY: 17 }}
          variants={{
            closed: { rotate: 0, y: 0 },
            open: {
              rotate: 45,
              y: -7,
            },
          }}
        />
      </g>
    </svg>
  </Toggle>
)

export default NavToggle
