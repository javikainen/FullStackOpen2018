import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    this.props.setFilter(event.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        Filter: <input type='text' onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter
