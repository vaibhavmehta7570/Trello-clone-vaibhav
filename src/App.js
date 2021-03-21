import './App.css'
import React from 'react'
import Main from './Task2-Trello Clone/Main'

import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <div className='App'>
          <Main />
        </div>
      </Router>
    </div>
  )
}

export default App
