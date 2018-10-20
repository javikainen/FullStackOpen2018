import React from 'react'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    if (this.state.persons.map(person => person.name).includes(this.state.newName)) {
      alert('The name has already been added')
      this.setState({
        newName: '',
        newNumber: '',
        filter: ''
      })
    } else {
      const person = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      personService
        .create(person)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: '',
            filter: ''
          })
        })
    }
  }

  deletePerson = (personToDelete) => (
    () => {
      if (window.confirm(`Poistetaanko ${personToDelete.name}?`)) {
        personService
          .deletePerson(personToDelete.id)
          .then(response => {
            this.setState({
              persons: this.state.persons.filter(person => person.id !== personToDelete.id)
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
                deletePerson={this.deletePerson(person)}
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

export default App
