import React, { Component } from "react"
import "./TableData.scss"

class TableData extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    if (e.target.classList.contains("left") || e.target.classList.contains("right")) {
      this.props.handleClick(e)
    } else if (e.target.className === "edit") {
      this.props.handleEdit(e.target.id)
    } else if (e.target.className === "delete") {
      this.props.handleDelete(e.target.id)
    }
  }

  render() {
    const data = this.props.data
    const rows = data.map(u => {
      return (
        <tr key={u.uid}>
          <td data-label="Uni Id">{u.uid}</td>
          <td data-label="Uni Name">{u.uni_name}</td>
          <td data-label="Reg Date">{u.reg_date}</td>
          <td data-label="Exp Date">{u.exp_date}</td>
          <td data-label="Img Url">
            <a href={u.imgurl}>{u.imgurl}</a>
          </td>
          <td data-label="No of Students">{u.no_of_students}</td>
          <td data-label="Email">{u.email}</td>
          <td data-label="Web Url">
            <a href={u.weburl}>{u.weburl}</a>
          </td>
          <td data-label="Contact No">{u.contact_no}</td>
          <td data-label="Edit">
            <button onClick={this.handleClick} id={u.uid} className="edit">
              Edit
            </button>
          </td>
          <td data-label="Delete">
            <button onClick={this.handleClick} id={u.uid} className="delete">
              Delete
            </button>
          </td>
        </tr>
      )
    })

    return (
      <div className="TableData">
        <table>
          <caption>University Data</caption>
          <thead>
            <tr>
              <th scope="col">Uni Id</th>
              <th scope="col">Uni Name</th>
              <th scope="col">Reg Date</th>
              <th scope="col">Exp Date</th>
              <th scope="col">Img Url</th>
              <th scope="col">No of Students</th>
              <th scope="col">Email</th>
              <th scope="col">Web Url</th>
              <th scope="col">Contact NO</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <div className="TableData-controls">
          <i className="fa fa-chevron-left left" onClick={this.handleClick}></i>
          <i className="fa fa-chevron-right right" onClick={this.handleClick}></i>
        </div>
      </div>
    )
  }
}

export default TableData
