import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import customTheme from './themes/customTheme'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider resetCSS={true} theme={customTheme}>
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
