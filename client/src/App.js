import React from "react"
import "./App.css"
import { Switch, Route } from "react-router-dom"
import Login from "./Login"
import HomePage from "./HomePage"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route exact path="/login" render={() => <Login />} />
      </Switch>
    </div>
  )
}

export default App
