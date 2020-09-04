import React, { Suspense, lazy, Component } from "react"
import { Router, Switch, Route } from "react-router-dom"

// Utils and stylesheets
import history from "./utils/history"
import "./App.css"

// Import contexts
import { UserContext } from "./contexts/UserContext"

// Import custom compoonents
import Loading from "./Loading"

// Lazy load components
const Header = lazy(() => import("./Header"))
const Login = lazy(() => import("./Login"))
const HomePage = lazy(() => import("./HomePage"))
const NotFoundPage = lazy(() => import("./NotFoundPage"))
const Dashboard = lazy(() => import("./Dashboard"))

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "",
      setUser: this.setUser,
    }
  }

  // setUser context function
  setUser = user => {
    this.setState({ user })
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <div className="App">
          <Suspense fallback={<Loading />}>
            <Header />
            {/* <Router history={history}> */}
            <Switch>
              <Route exact path="/" render={() => <HomePage />} />
              <Route exact path="/login" render={() => <Login />} />
              <Route
                exact
                path="/dashboard"
                render={() => {
                  if (!this.state.user) {
                    history.push("/login")
                  }
                  return <Dashboard />
                }}
              />
              <Route render={() => <NotFoundPage />} />
            </Switch>
            {/* </Router> */}
          </Suspense>
        </div>
      </UserContext.Provider>
    )
  }
}

export default App
