import React, { Suspense, lazy, Component } from "react"
import { Router, Switch, Route, withRouter } from "react-router-dom"

// Utils and stylesheets
import { decodeBase64 } from "./utils/base64"
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
      user: this.setInitialUser(),
      setUser: this.setUser,
    }
  }

  componentDidMount() {
    const user = this.setInitialUser()
    this.setState({ user })
  }

  setInitialUser() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token").split(".")[1]
      const res = JSON.parse(decodeBase64(token))
      return res.username
    } else {
      return ""
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
            <Switch>
              <Route exact path="/" render={() => <HomePage />} />
              <Route exact path="/login" render={() => <Login />} />
              <Route
                exact
                path="/dashboard"
                render={() => {
                  if (!localStorage.getItem("token")) {
                    this.props.history.push("/login")
                  }
                  return <Dashboard />
                }}
              />
              <Route
                exact
                path="/logout"
                render={() => {
                  localStorage.removeItem("token")
                  this.props.history.push("/")
                }}
              />
              <Route render={() => <NotFoundPage />} />
            </Switch>
          </Suspense>
        </div>
      </UserContext.Provider>
    )
  }
}

export default withRouter(App)
