import React from 'react'

class Notification extends React.Component {
  componentDidMount() {
    const { store } = this.props
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

render() {
    const { notification } = this.props.store.getState()

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

export default Notification
