import React from 'react'
import { setFilter } from '../reducers/filterReducer'

class Filter extends React.Component {
  componentDidMount() {
    const { store } = this.props
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange = (event) => {
    this.props.store.dispatch(setFilter(event.target.value))
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

export default Filter
