import React from 'react'


class App extends React.Component {

  voteButton = (id) => (
    () => {
      this.props.store.dispatch({
        type: 'VOTE',
        data: {
          id
        }
      })
    }
  )

  addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'ADD',
      data: {
        anecdote
      }
    })
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = [...this.props.store.getState()].sort((a1, a2) => a2.votes - a1.votes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteButton(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App
