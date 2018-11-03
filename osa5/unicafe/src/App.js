import React from 'react'

const Statistics = () => {
  const n_feedback = 0

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
            <td></td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td></td>
          </tr>
          <tr>
            <td>Bad</td>
            <td></td>
          </tr>
          <tr>
            <td>Average</td>
            <td></td>
          </tr>
          <tr>
            <td>Positive</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <button>Reset statistics</button>
    </div >
  )
}

class App extends React.Component {
  click = (button) => () => {

  }

  render() {
    return (
      <div>
        <h2>Give feedback</h2>
        <button onClick={this.click('GOOD')}>Good</button>
        <button onClick={this.click('OK')}>Neutral</button>
        <button onClick={this.click('BAD')}>Bad</button>
        <Statistics />
      </div>
    )
  }
}

export default App
