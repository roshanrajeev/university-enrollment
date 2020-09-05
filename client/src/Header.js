import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { UserContext } from "./contexts/UserContext"
import "./Header.scss"

class Header extends Component {
  static contextType = UserContext
  constructor(props) {
    super(props)
    this.state = {
      isUserProfileActive: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleClick(e) {
    e.preventDefault()
    this.setState(st => {
      return {
        isUserProfileActive: !st.isUserProfileActive,
      }
    })
  }

  handleLogout() {
    this.context.setUser("")
    this.props.history.push("/logout")
    this.setState(st => {
      return {
        isUserProfileActive: false,
      }
    })
  }
  render() {
    const list = !this.context.user ? (
      <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/logout" onClick={this.handleClick}>
            Logout
          </Link>
        </li>
      </>
    )
    return (
      <nav>
        <div className="nav-container">
          <h1>
            <Link to="/">Edu Live</Link>
          </h1>
          <ul>{list}</ul>
          {this.state.isUserProfileActive ? (
            <div className="Header-userProfile">
              <p>
                _hello <span>{this.context.user}</span>
              </p>
              <button onClick={this.handleLogout}>Logout</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
