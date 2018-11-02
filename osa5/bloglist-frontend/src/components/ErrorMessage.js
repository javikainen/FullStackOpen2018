import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string
}

export default ErrorMessage
