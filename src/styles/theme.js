import React from "react"
import styled from "styled-components"

const themed = Target => styled(({ theme, ...props }) => <Target {...props} />)

export default themed
