import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {initialAppointmentList: [], title: '', date: '', isFilterOn: false}

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state

    const dateInput = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''

    const newAppointment = {
      id: uuidv4(),
      title,
      dateInput,
      isClicked: false,
    }

    this.setState(prevState => ({
      initialAppointmentList: [
        ...prevState.initialAppointmentList,
        newAppointment,
      ],
      title: '',
      date: '',
    }))
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      initialAppointmentList: prevState.initialAppointmentList.map(eachObj => {
        if (eachObj.id === id) {
          return {...eachObj, isClicked: !eachObj.isClicked}
        }
        return eachObj
      }),
    }))
  }

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateDate = event => {
    this.setState({date: event.target.value})
  }

  applyFilter = () => {
    this.setState(prevState => ({isFilterOn: !prevState.isFilterOn}))
  }

  getList = () => {
    const {initialAppointmentList, isFilterOn} = this.state

    if (isFilterOn) {
      const filteredList = initialAppointmentList.filter(
        each => each.isClicked === true,
      )
      return filteredList
    }
    return initialAppointmentList
  }

  render() {
    const {title, date, isFilterOn} = this.state

    const appointmentList = this.getList()

    const applyStyle = isFilterOn ? ' active' : ''

    return (
      <div className="app-bg-container">
        <div className="detailed-container">
          <div className="cards-container">
            <form className="form-element" onSubmit={this.onAddAppointment}>
              <h1 className="main-heading">Add Appointment</h1>
              <div className="input-cards">
                <label htmlFor="titleInput" className="label-element">
                  Title
                </label>
                <input
                  type="text"
                  id="titleInput"
                  className="input-element"
                  placeholder="TITLE"
                  value={title}
                  onChange={this.updateTitle}
                />
              </div>
              <div className="input-cards">
                <label htmlFor="dateInput" className="label-element">
                  Date
                </label>
                <input
                  type="date"
                  id="dateInput"
                  className="input-element"
                  placeholder="TITLE"
                  value={date}
                  onChange={this.updateDate}
                />
              </div>

              <button type="submit" className="add-btn">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>

          <div className="card">
            <h1 className="title">Appointments</h1>
            <button
              className={`starred-btn ${applyStyle}`}
              type="button"
              onClick={this.applyFilter}
            >
              Starred
            </button>
          </div>

          <ul className="appointments-list">
            {appointmentList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                onToggleStar={this.onToggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
