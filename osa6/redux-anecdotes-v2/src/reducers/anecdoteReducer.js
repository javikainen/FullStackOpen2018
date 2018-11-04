import anecdoteService from '../services/anecdotes'

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

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      anecdote: newAnecdote
    })
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = {
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(anecdote.id, newAnecdote)
    dispatch({
      type : 'VOTE',
      id: anecdote.id
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer
