import React, { Component } from "react"
import { Link } from "react-router-dom"

import TableData from "./TableData"
import AddData from "./AddData"
import EditData from "./EditData"
import "./Dashboard.scss"

class Dashboard extends Component {
  static defaultProps = {
    limit: 3,
  }
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isAdding: false,
      isViewing: true,
      isEditing: "",
      pageNo: 0,
      MaxPages: 0,
    }
    this.handleClick = this.handleClick.bind(this)
    this.getUniversityData = this.getUniversityData.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handlePatchData = this.handlePatchData.bind(this)
  }

  async componentDidMount() {
    await this.getMaxPages()
    await this.getUniversityData()
  }

  async getMaxPages() {
    const token = localStorage.getItem("token")
    const res = await fetch(`/api/universities`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    if (res.status === 200) {
      const data = await res.json()
      this.setState({
        maxPages: Math.ceil(data.length / this.props.limit) - 1,
      })
    }
  }

  async getUniversityData() {
    const limit = this.props.limit
    const offset = limit * this.state.pageNo

    const token = localStorage.getItem("token")
    const res = await fetch(`/api/universities?limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    if (res.status === 200) {
      const data = await res.json()
      this.setState({
        data,
      })
    }
  }

  handleClick(e) {
    if (e.target.value === "add") {
      this.setState({
        isAdding: true,
        isViewing: false,
      })
    }
    if (e.target.value === "view") {
      this.setState({
        isViewing: true,
        isAdding: false,
      })
    }
    if (e.target.classList.contains("right")) {
      this.setState(
        st => {
          let pageNo = ++st.pageNo
          pageNo = pageNo >= this.state.maxPages ? this.state.maxPages : pageNo
          return {
            ...st,
            pageNo,
          }
        },
        () => {
          this.getUniversityData()
        }
      )
    }
    if (e.target.classList.contains("left")) {
      this.setState(
        st => {
          let pageNo = --st.pageNo
          pageNo = pageNo < 0 ? 0 : pageNo

          return {
            ...st,
            pageNo,
          }
        },
        () => {
          this.getUniversityData()
        }
      )
    }
  }

  async handleSubmit(data) {
    console.log(data)
    const token = localStorage.getItem("token")
    const res = await fetch("/api/universities", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (res.status === 200) {
      this.setState({
        isAdding: false,
        isViewing: true,
      })
      await this.getMaxPages()
      await this.getUniversityData()
    }
  }

  handleEdit(id) {
    this.setState({
      isEditing: id,
      isViewing: false,
      isAdding: false,
    })
  }

  async handlePatchData(id, data) {
    const token = localStorage.getItem("token")
    const res = await fetch(`/api/universities/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (res.status === 200) {
      this.setState({
        isEditing: "",
        isViewing: true,
        isAdding: false,
      })
      await this.getMaxPages()
      await this.getUniversityData()
    }
  }

  async handleDelete(id) {
    const token = localStorage.getItem("token")
    const res = await fetch(`/api/universities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    if (res.status === 200) {
      await this.getMaxPages()
      await this.getUniversityData()
    }
  }

  render() {
    let view = (
      <div className="no-enrollment">
        <h3>No Universities Enrolled Yet!</h3>
      </div>
    )
    if (this.state.isViewing && this.state.data.length !== 0) {
      view = (
        <TableData
          data={this.state.data}
          handleClick={this.handleClick}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      )
    } else if (this.state.isAdding) {
      view = <AddData handleSubmit={this.handleSubmit} />
    } else if (this.state.isEditing) {
      view = (
        <EditData
          data={this.state.data.find(d => d.uid === parseInt(this.state.isEditing))}
          handlePatchData={this.handlePatchData}
        />
      )
    }
    return (
      <div className="Dashboard">
        <div>
          <button onClick={this.handleClick} value="add">
            Add
          </button>
          <button onClick={this.handleClick} value="view">
            View
          </button>
          {view}
        </div>
      </div>
    )
  }
}

export default Dashboard
