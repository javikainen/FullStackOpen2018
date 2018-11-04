import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.props
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  voteButton = (anecdote) => (
    () => {
      this.props.store.dispatch(anecdoteVoting(anecdote.id))
      this.props.store.dispatch(setNotification(`You voted '${anecdote.content}'`))
      setTimeout(() => this.props.store.dispatch(clearNotification()), 5000)
    }
  )

  anecdotesToShow = () => {
    const { anecdotes, filter } = this.props.store.getState()
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.anecdotesToShow().sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteButton(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
