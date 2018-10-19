import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: {0:0, 1:0, 2:0, 3:0, 4:0, 5:0},
      mostVotes: 0
    }
  }

  render() {
    const addVote = () => {
      const copy = {...this.state.votes}
      copy[this.state.selected] += 1
      if (copy[this.state.selected] > copy[this.state.mostVotes]) {
        this.setState({ mostVotes: this.state.selected })
      }
      return copy
    }

    return (
      <div>
        <p>
          {this.props.anecdotes[this.state.selected]}<br />
          This anecdote has {this.state.votes[this.state.selected]} votes.<br />
          <button onClick={() => this.setState({ votes: addVote() })}>
            Vote
          </button>
          <button onClick={() => this.setState({ selected: Math.floor(Math.random() * 6) })}>
            Next anecdote
          </button>
        </p>
        <h1>Anecdote with most votes:</h1>
        {this.props.anecdotes[this.state.mostVotes]}<br />
        This anecdote has {this.state.votes[this.state.mostVotes]} votes.<br />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
