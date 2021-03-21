import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import NavBar from './components/NavBar'

import Dashboard from './pages/Dashboard'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import StartupPage from './pages/StartupPage'

function Main() {
  const [currentSearch, setCurrentSearch] = useState('')
  return (
    <Router>
      <NavBar setCurrentSearch={setCurrentSearch} />
      <Switch>
        <Route exact path="/">
          <StartupPage />
        </Route>
        <Route exact path="/boards">
          <HomePage currentSearch={currentSearch} />
        </Route>
        <Route exact path="/boards/:finalId" component={Dashboard}></Route>
      </Switch>
    </Router>
  )
}
export default Main
