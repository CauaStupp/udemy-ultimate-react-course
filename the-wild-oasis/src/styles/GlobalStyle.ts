import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    transition: background-color 0.3s, border 0.3s;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Poppins", sans-serif;
    color: ${(props) => props.theme.colors.grey[700]};
    background-color: ${(props) => props.theme.colors.grey[50]};
    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
  }

  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  button { cursor: pointer; }
  *:disabled { cursor: not-allowed; }

  select:disabled, input:disabled {
    background-color: ${(props) => props.theme.colors.grey[200]};
    color: ${(props) => props.theme.colors.grey[500]};
  }

  input:focus, button:focus, textarea:focus, select:focus {
    outline: 2px solid ${(props) => props.theme.colors.brand[600]};
    outline-offset: -1px;
  }

  img {
    max-width: 100%;
    filter: grayscale(${(props) => props.theme.image.grayscale}) opacity(${(props) => props.theme.image.opacity});
  }*, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    transition: background-color 0.3s, border 0.3s;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: "Poppins", sans-serif;
    color: ${(props) => props.theme.colors.grey[700]};
    background-color: ${(props) => props.theme.colors.grey[50]};
    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
  }

  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button { cursor: pointer; }
  *:disabled { cursor: not-allowed; }

  select:disabled, input:disabled {
    background-color: ${(props) => props.theme.colors.grey[200]};
    color: ${(props) => props.theme.colors.grey[500]};
  }

  input:focus, button:focus, textarea:focus, select:focus {
    outline: 2px solid ${(props) => props.theme.colors.brand[600]};
    outline-offset: -1px;
  }

  img {
    max-width: 100%;
    filter: grayscale(${(props) => props.theme.image.grayscale});
    opacity: ${(props) => props.theme.image.opacity};
  }
`;

export default GlobalStyle;
