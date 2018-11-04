const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SETFILTER': {
    return action.filter
  }
  default:
    return state
  }
}

export const setFilter = (filter) => {
  return {
    type : 'SETFILTER',
    filter
  }
}

export default filterReducer
