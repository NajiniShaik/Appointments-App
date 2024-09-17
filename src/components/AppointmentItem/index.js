import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onToggleStar} = props

  const {title, dateInput, isClicked, id} = appointmentDetails

  const onClickStar = () => {
    onToggleStar(id)
  }

  const imgUrl = isClicked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="each-item">
      <div className="detailed-card">
        <p className="title">{title}</p>
        <button
          className="button"
          type="button"
          onClick={onClickStar}
          data-testid="star"
        >
          <img src={imgUrl} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">Date: {dateInput}</p>
    </li>
  )
}

export default AppointmentItem
