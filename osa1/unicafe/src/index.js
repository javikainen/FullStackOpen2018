import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
  }

  addFeedback = (feedback, value) => {
    return (() => {
      this.setState({[feedback]: value})
    })
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button
          feedback={'good'}
          handleClick={this.addFeedback('good', this.state['good'] + 1)}
        />
        <Button
          feedback={'neutral'}
          handleClick={this.addFeedback('neutral', this.state['neutral'] + 1)}
        />
        <Button
          feedback={'bad'}
          handleClick={this.addFeedback('bad', this.state['bad'] + 1)}/><br/>
        <Statistics
          state={this.state}
        />
      </div>
      )
    }
}

const statStrings = {
  good: "Hyvä",
  neutral: "Neutraali",
  bad: "Huono",
  avg: "Keskiarvo",
  pos: "Positiivisia"
}

const Button = ({feedback, handleClick}) => {
  return (
    <button onClick={handleClick}>
      {statStrings[feedback]}
    </button>
  )
}

const Statistics = ({state}) => {
  if (state.good === 0 && state.neutral === 0 && state.bad === 0) {
    return (
      <div>
        <h1>Statistiikka</h1>
        Ei yhtään palautetta annettu
      </div>
    )
  }
  return (
    <div>
      <h1>Statistiikka</h1>
      <table>
      <tbody>
        <Statistic
          state={state}
          stat={'good'}
        />
        <Statistic
          state={state}
          stat={'neutral'}
        />
        <Statistic
          state={state}
          stat={'bad'}
        />
        <Statistic
          state={state}
          stat={'avg'}
        />
        <Statistic
          state={state}
          stat={'pos'}
        />
      </tbody>
      </table>
    </div>
  )
}

const Statistic = ({state, stat}) => {
  let result = 0
  let sum = 0
  switch (stat) {
    case 'good':
      result = state.good
      break;
    case 'neutral':
      result = state.neutral
      break;
    case 'bad':
      result = state.bad
      break;
    case 'avg':
      for (const val in state) {
        sum += state[val]
      }
      result = ((state.good - state.bad) / sum).toFixed(1)
      break;
    case 'pos':
      for (const val in state) {
        sum += state[val]
      }
      result = (state.good / sum * 100).toFixed(1)
      result += " %"
      break;
    default:
  }
  return (
    <tr>
      <td>{statStrings[stat] + ":"}</td>
      <td>{result}</td>
    </tr>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
