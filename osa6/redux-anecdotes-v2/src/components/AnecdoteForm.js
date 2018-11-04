import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  componentDidMount() {
    const { store } = this.props
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(anecdoteCreation(content))

    this.props.store.dispatch(setNotification(`You added a new anecdote: '${content}'`))
    e.target.anecdote.value = ''

    setTimeout(() => this.props.store.dispatch(clearNotification()), 5000)
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

export default AnecdoteForm
