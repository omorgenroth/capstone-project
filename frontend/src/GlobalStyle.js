import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`

:root {
    --c-green: #93e2ca;
    --c-lightgreen: #EFFBF7;
    --c-darkgreen: #0B2027;
    --c-white: #f7f7f7;
    --c-gray: #707070;
    --c-orange: #ff6e4a;
    --c-blue: #1a212c;
}

html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

body {
    padding:0;
    margin:0;
    font-size: 112.5%;
    font-family: 'Comfortaa', cursive;
    color: var(--c-gray);
    background-color: var(--c-lightgreen);
    
}


`
