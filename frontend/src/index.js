import React from 'react'
import ReactDOM from 'react-dom'
import GlobalStyle from './GlobalStyle'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
