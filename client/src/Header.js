import React, { Component } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./contexts/UserContext"
import "./Header.scss"

class Header extends Component {
  static contextType = UserContext

  render() {
    return (
      <nav>
        <div className="nav-container">
          <h1>
            <Link to="/">DZ App</Link>
          </h1>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
