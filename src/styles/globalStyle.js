import { createGlobalStyle } from "styled-components"

import c from "./constants"

import FabrigaWoff from "../../assets/fonts/Fabriga.woff"
import FabrigaWoff2 from "../../assets/fonts/Fabriga.woff2"
import FabrigaMediumWoff from "../../assets/fonts/FabrigaMedium.woff"
import FabrigaMediumWoff2 from "../../assets/fonts/FabrigaMedium.woff2"
import FabrigaBoldWoff from "../../assets/fonts/Fabriga-Bold.woff"
import FabrigaBoldWoff2 from "../../assets/fonts/Fabriga-Bold.woff2"
import FabrigaLightWoff from "../../assets/fonts/FabrigaLight.woff"
import FabrigaLightWoff2 from "../../assets/fonts/FabrigaLight.woff2"

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,500&display=swap');

  @font-face {
    font-family: "Fabriga";
    font-style: normal;
    font-weight: 300;
    src: url(${FabrigaLightWoff2}) format("woff2"), url(${FabrigaLightWoff}) format("woff");
  }
  @font-face {
    font-family: "Fabriga";
    font-style: normal;
    font-weight: 400;
    src: url(${FabrigaWoff2}) format("woff2"), url(${FabrigaWoff}) format("woff");
  }
  @font-face {
    font-family: "Fabriga";
    font-style: normal;
    font-weight: 500;
    src: url(${FabrigaMediumWoff2}) format("woff2"), url(${FabrigaMediumWoff}) format("woff");
  }
  @font-face {
    font-family: "Fabriga";
    font-style: normal;
    font-weight: 600;
    src: url(${FabrigaBoldWoff2}) format("woff2"), url(${FabrigaBoldWoff}) format("woff");
  }

  * {
    box-sizing: border-box;
  }
  
  html {
    height: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: ${c.FONT_BASE};
    font-family: ${c.FONT_PRIMARY};
    color: ${c.BLACK};
    line-height: 2;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    overflow-x: hidden;
    transition: background-color 1s;
  }

  main {
    display: block;
  }

  a {
    background-color: transparent;
    text-decoration: none;
    color: ${c.BLACK};
  }

  p {
    margin-top: 0;
  }

  img {
    border-style: none;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15; 
    margin: 0; 
  }

  button,
  input { 
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  label {
    display: inline-block;
    margin-bottom: .5rem;
  }

  .tl-wrapper {
    background-color: ${c.WHITE};
  }
`
