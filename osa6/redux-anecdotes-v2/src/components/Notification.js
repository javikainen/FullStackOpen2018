import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {

  render() {
    const { notification } = this.props

    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    if (notification === null) {
      return null
    }

    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification
