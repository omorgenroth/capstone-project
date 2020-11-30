import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`

:root {
    --c-green: rgb(147,226,202);
    --c-white: rgb(247,247,247);
    --c-gray: rgb(112,112,112);
    --c-orange: rgb(255, 110, 74);
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
    
}


`
