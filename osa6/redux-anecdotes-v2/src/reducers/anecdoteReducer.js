
const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
  case 'VOTE': {
    const old = state.filter(a => a.id !== action.id)
    const voted = state.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 }]
  }
  case 'CREATE':
    return state.concat(action.anecdote)
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export const anecdoteCreation = (anecdote) => {
  return {
    type: 'CREATE',
    anecdote
  }
}

export const anecdoteVoting = (id) => {
  return {
    type : 'VOTE',
    id
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default anecdoteReducer
