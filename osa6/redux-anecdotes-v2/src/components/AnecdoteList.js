import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  voteButton = (anecdote) => (
    () => {
      this.props.anecdoteVoting(anecdote.id)
      this.props.setNotification(`You voted '${anecdote.content}'`)
      setTimeout(() => this.props.clearNotification(), 5000)
    }
  )

  anecdotesToShow = () => {
    const { anecdotes, filter } = this.props
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  }

  render() {
    return (
      <div>
        <Filter />
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  anecdoteVoting,
  setNotification,
  clearNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
