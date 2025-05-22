import { createGlobalStyle } from "styled-components";
import "./font.css";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "NanumSquareRound", sans-serif;
    background-color: #fff;
    color: #000;
    line-height: 1.5;
  }

    ::-webkit-scrollbar{
        display:none;
    }

    input{
    border:none;
    outline:none;
}
    
  button {
    font-family: inherit;
    width:auto;
    background:none;
    border:none;
    cursor:pointer;
    &:focus{
        outline:none;
    }
  }

  input, textarea {
    font-family: inherit;
  }
`;

export default GlobalStyle;
