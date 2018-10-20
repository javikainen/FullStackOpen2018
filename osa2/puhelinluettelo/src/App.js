import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    if (this.state.persons.map(person => person.name).includes(this.state.newName)) {
      alert('The name has already been added')
      this.setState({
        newName: ''
      })
    } else {
      const person = {
        name: this.state.newName
      }

      const persons = this.state.persons.concat(person)

      this.setState({
        persons: persons,
        newName: ''
      })
    }
  }

  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi:
            <input
              value={this.state.newName}
              onChange={this.handleNoteChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <dl>
          {this.state.persons.map(person => <Person key={person.name} person={person} />)}
        </dl>
      </div>
    )
  }
}

const Person = ({ person })  => {
  return (
    <dt>{person.name}</dt>
  )
}

export default App
