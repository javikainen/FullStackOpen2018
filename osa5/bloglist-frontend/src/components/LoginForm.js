import React from 'react'

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

export default LoginForm
