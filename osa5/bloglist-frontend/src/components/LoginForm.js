import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ state, handleChange, login }) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={login}>
      <div>
        username
        <input
          type='text'
          name='username'
          value={state.username}
          onChange={handleChange}
        />
      </div>
      <div>
        password
        <input
          type='password'
          name='password'
          value={state.password}
          onChange={handleChange}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
}

export default LoginForm
