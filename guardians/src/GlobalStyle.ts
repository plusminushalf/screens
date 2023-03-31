import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html {
        background: #0F172A;
        font-family: 'DM Sans', sans-serif;
    }

    body {
       margin: 0px;
       padding: 0px;
       color: #F8FAFC;
    }

    .MuiFormControl-root,
    .MuiInputBase-root {
        width: 100% !important;
    }
`

export default GlobalStyle
