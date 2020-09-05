import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

import { UserContext } from "./contexts/UserContext"
import "./Login.scss"

class Login extends Component {
  static contextType = UserContext

  constructor(props) {
    super(props)
    this.state = {
      user_id: "",
      password: "",
      isValidMsg: "",
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  async handleSubmit(e) {
    e.preventDefault()

    // Check Fields
    if (!this.state.user_id || !this.state.password) {
      return this.showMessage("Fields shouldn't be empty.")
    }

    // Validate Creadentials
    const isValid = await this.validateLogin()
    if (!isValid) {
      return this.showMessage("Invalid Credentials!")
    }

    // Redirect to dashboard
    this.context.setUser(this.state.user_id)
    this.props.history.push("/dashboard")
  }

  async validateLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        password: this.state.password,
      }),
    })

    // Return false if unauthorized
    if (res.status !== 200) {
      return false
    }

    // Save token to localstorage
    const { token } = await res.json()
    localStorage.setItem("token", token)

    // Return true since authorized
    return true
  }

  showMessage(msg) {
    this.setState({
      isValidMsg: msg,
    })
    setTimeout(() => {
      this.setState({
        isValidMsg: "",
      })
    }, 2000)
  }

  render() {
    return (
      <div className="Login">
        <div className="Login-container">
          <div className="Login-form-container">
            <div className="Login-main">
              <h1>Sign In</h1>
              <p className="Login-error-msg">{this.state.isValidMsg}</p>
              <form onSubmit={this.handleSubmit} className="Login-form" autoComplete="off">
                <input
                  type="text"
                  name="user_id"
                  placeholder="Username"
                  value={this.state.user_id}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <div className="input-footer">
                  <button type="submit">Submit</button>
                  <Link to="/forgot-password">
                    Fogot <span>Password!</span>
                  </Link>
                </div>
              </form>
            </div>
            <div className="Login-sidepanel">
              <h2>Welcome to University Manager</h2>
              <p>Please register if you haven't done it yet!</p>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
