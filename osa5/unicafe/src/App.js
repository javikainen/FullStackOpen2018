import React from 'react'

const Statistics = ({ store }) => {
  const { good, ok, bad } = store.getState()
  const n_feedback = good + ok + bad

  if (n_feedback === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <div>No feedback received</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>Good</td>
            <td>{(good / n_feedback * 100).toFixed(1)} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO' })}>Reset statistics</button>
    </div >
  )
}

class App extends React.Component {

  click = (button) => () => this.props.store.dispatch({ type: button })

  render() {
    return (
      <div>
        <h2>Give feedback</h2>
        <button onClick={this.click('GOOD')}>Good</button>
        <button onClick={this.click('OK')}>Neutral</button>
        <button onClick={this.click('BAD')}>Bad</button>
        <Statistics store={this.props.store}/>
      </div>
    )
  }
}

export default App
