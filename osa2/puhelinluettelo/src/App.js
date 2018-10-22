import React from 'react'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      statusMessage: null,
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(persons => this.setState({ persons }))
  }

  addPerson = (event) => {
    event.preventDefault()
    const person = this.state.persons.find(p => p.name === this.state.newName)
    if (person === undefined) {
      const person = {
        name: this.state.newName,
        number: this.state.newNumber
      }
      personService
        .create(person)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            statusMessage: `Lisättiin ${newPerson.name}`
          })
        })
    } else if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
      const newPerson = { ...person, number: this.state.newNumber }
      personService
        .update(newPerson.id, newPerson)
        .then(res_person => {
          this.setState({
            persons: this.state.persons.map(p => p.id !== res_person.id ? p : res_person),
            statusMessage: `Päivitettiin numero henkilölle ${newPerson.name}`
          })
        })
    }
    this.setState({
      newName: '',
      newNumber: '',
      filter: ''
    })
    setTimeout(() => {
      this.setState({
        statusMessage: null
      })
    }, 5000)
  }

  deletePerson = (id) => (
    () => {
      const name = this.state.persons.find(p => p.id === id).name
      if (window.confirm(`Poistetaanko ${name}?`)) {
        personService
          .deletePerson(id)
          .then(response => {
            this.setState({
              persons: this.state.persons.filter(person => person.id !== id),
              statusMessage: `Poistettiin ${name}`
            })
          })
      }
    }
  )

  handleChange = (field) => (
    (event) => {
      console.log(event.target.value)
      this.setState({ [field]: event.target.value })
    }
  )

  render() {
    const filteredPersons =
      this.state.persons.filter(person => person.name.toLowerCase().search(this.state.filter.toLowerCase()) > -1)

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification
          message={this.state.statusMessage}
        />
        <FilterForm
          state={this.state}
          handleChange={this.handleChange}
        />
        <AddPersonForm
          state={this.state}
          handleChange={this.handleChange}
          addPerson={this.addPerson}
        />
        <h2>Numerot</h2>
        <table>
          <tbody>
            {filteredPersons.map(person =>
              <Person
                key={person.id}
                person={person}
                deletePerson={this.deletePerson(person.id)}
              />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const FilterForm = ({ state, handleChange }) => (
  <div>
    rajaa näytettäviä:
    <input
      value={state.filter}
      onChange={handleChange('filter')}
    />
  </div>
)

const AddPersonForm = ({ state, handleChange, addPerson }) => (
  <div>
    <h2>Lisää uusi</h2>
    <form onSubmit={addPerson}>
      <div>
        nimi:
        <input
          value={state.newName}
          onChange={handleChange('newName')}
        />
      </div>
      <div>
        numero:
        <input
          value={state.newNumber}
          onChange={handleChange('newNumber')}
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  </div>
)

const Person = ({ person, deletePerson })  => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><button onClick={deletePerson}>poista</button></td>
  </tr>

)

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className='error'>
        {message}
      </div>
    )
}

export default App
