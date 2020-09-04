import React from "react"
import "./App.css"
import { Switch, Route } from "react-router-dom"
import Login from "./Login"
import HomePage from "./HomePage"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" render={() => <Login />} />
      </Switch>
      <HomePage />
    </div>
  )
}

export default App
