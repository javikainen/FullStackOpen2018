import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      username: '',
      password: '',
      user: null,
      blogTitle: '',
      blogAuthor: '',
      blogUrl: '',
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch(exception) {
      this.setState({
        error: 'invalid username or password',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    this.setState({ username: '', password: '', user: null })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: this.state.blogTitle,
        author: this.state.blogAuthor,
        url: this.state.blogUrl,
      }

      const result = await blogService.create(blogObject)
      this.setState({
        blogs: this.state.blogs.concat(result),
        blogTitle: '',
        blogAuthor: '',
        blogUrl: '',
      })
    } catch(exception) {
      console.log(exception)
    }
  }

  render() {
    if (this.state.user === null) {
      return (
        <LoginForm
          state={this.state}
          handleChange={this.handleFieldChange}
          login={this.login}
        />
      )
    }
    return (
      <div>
        <h2>Blogs</h2>
        {this.state.user.name} logged in
        <button onClick={this.logout}>logout</button>
        <br></br>
        <BlogForm
          state={this.state}
          handleChange={this.handleFieldChange}
          addBlog={this.addBlog}
        />
        <br></br>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

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

const BlogForm = ({ state, handleChange, addBlog }) => (
  <div>
    <h3>Create a new blog</h3>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type='text'
          name='blogTitle'
          value={state.blogTitle}
          onChange={handleChange}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          name='blogAuthor'
          value={state.blogAuthor}
          onChange={handleChange}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          name='blogUrl'
          value={state.blogUrl}
          onChange={handleChange}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  </div>
)

export default App;
