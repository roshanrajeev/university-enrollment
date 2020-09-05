import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { UserContext } from "./contexts/UserContext"
import "./Header.scss"

class Header extends Component {
  static contextType = UserContext
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    e.preventDefault()
    this.context.setUser("")
    this.props.history.push("/logout")
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
            <Link to="/">DZ App</Link>
          </h1>
          <ul>{list}</ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
