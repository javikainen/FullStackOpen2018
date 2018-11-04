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

export const notify = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type : 'NOTIFY',
      notification
    })
    setTimeout(() => {
      dispatch({
        type : 'CLEARNOTIF'
      })
    }, time * 1000)
  }
}

export default notificationReducer
