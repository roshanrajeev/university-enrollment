import React, { Component } from "react"
import "./AddData.scss"

class AddData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uni_name: "",
      reg_date: "",
      exp_date: "",
      imgurl: "",
      no_of_students: "",
      email: "",
      weburl: "",
      contact_no: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSubmit({
      uni_name: this.state.uni_name,
      reg_date: this.state.reg_date,
      exp_date: this.state.exp_date,
      imgurl: this.state.imgurl,
      no_of_students: this.state.no_of_students,
      email: this.state.email,
      weburl: this.state.weburl,
      contact_no: this.state.contact_no,
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    return (
      <div className="AddData">
        <h2>University Registration Form</h2>
        <form className="AddData-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="uni_name">University Name</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="University Name"
              id="uni_name"
              name="uni_name"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reg_date">Registration Date</label>
              <input
                type="date"
                onChange={this.handleChange}
                id="reg_date"
                name="reg_date"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exp_date">Expiry Date</label>
              <input
                type="date"
                onChange={this.handleChange}
                id="exp_date"
                name="exp_date"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="imgurl">Image Url</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="https://example.com/university.jpg"
              id="imgurl"
              name="imgurl"
            />
          </div>
          <div className="form-group">
            <label htmlFor="no_of_students">No of Students</label>
            <input
              type="number"
              onChange={this.handleChange}
              min="0"
              placeholder="0"
              id="no_of_students"
              name="no_of_students"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={this.handleChange}
              placeholder="joe@example.com"
              id="email"
              name="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="weburl">Web URL</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="http://example.com"
              id="weburl"
              name="weburl"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact_no">Contact No</label>
            <input
              type="tel"
              onChange={this.handleChange}
              placeholder="Contact No"
              id="contact_no"
              name="contact_no"
              required
            />
          </div>

          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddData
