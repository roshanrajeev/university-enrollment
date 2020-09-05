import React, { Component } from "react"
import "./EditData.scss"

class EditData extends Component {
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const data = this.props.data
    this.setState({
      uni_name: data.uni_name,
      reg_date: data.reg_date,
      exp_date: data.exp_date,
      imgurl: data.imgurl,
      no_of_students: data.no_of_students,
      email: data.email,
      weburl: data.weburl,
      contact_no: data.contact_no,
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.handlePatchData(this.props.data.uid, this.state)
  }

  render() {
    return (
      <div className="EditData">
        <h2>University Registration Form</h2>
        <form className="EditData-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="uni_name">University Name</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="University Name"
              id="uni_name"
              name="uni_name"
              value={this.state.uni_name}
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
                value={this.state.reg_date}
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
                value={this.state.exp_date}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="imgurl">Image Url</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Image Url"
              id="imgurl"
              name="imgurl"
              value={this.state.imgurl}
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
              value={this.state.no_of_students}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Email"
              id="email"
              name="email"
              value={this.state.email}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="weburl">Web URL</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Web Url"
              id="weburl"
              name="weburl"
              value={this.state.weburl}
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
              value={this.state.contact_no}
              required
            />
          </div>

          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default EditData
