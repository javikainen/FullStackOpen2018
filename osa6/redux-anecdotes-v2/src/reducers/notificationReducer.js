const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFY': {
    return action.notification
  }
  case 'CLEARNOTIF':
    return null
  default:
    return state
  }
}

export const setNotification = (notification) => {
  return {
    type : 'NOTIFY',
    notification
  }
}

export const clearNotification = () => {
  return {
    type : 'CLEARNOTIF'
  }
}

export default notificationReducer
