import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {

  handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew({ content, votes: 0 })
    this.props.anecdoteCreation(newAnecdote)

    this.props.setNotification(`You added a new anecdote: '${content}'`)

    setTimeout(() => this.props.clearNotification(), 5000)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  anecdoteCreation,
  setNotification,
  clearNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
