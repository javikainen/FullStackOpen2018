import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      notification: null,
      error: null,
      username: '',
      password: '',
      user: null,
      blogTitle: '',
      blogAuthor: '',
      blogUrl: '',
    }
  }

  async componentDidMount() {
    const blogs = await blogService.getAll()
    this.setState({ blogs })

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
        error: 'Invalid username or password',
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
      this.blogForm.toggleVisibility()
      this.setState({
        blogs: this.state.blogs.concat(result),
        blogTitle: '',
        blogAuthor: '',
        blogUrl: '',
        notification: `A new blog '${result.title}' by ${result.author} added`
      })
      setTimeout(() => {
        this.setState({ notification: null })
      }, 5000)
    } catch(exception) {
      console.log(exception)
      this.setState({
        error: `Unable to add the blog for some reason (${exception})`,
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  addLike = (blog) => (
    async () => {
      try {
        let { _id, user, likes, author, title, url } = blog
        let newBlog = {
          user: user._id,
          likes: likes + 1,
          title,
          url,
          author,
        }
        await blogService.update(_id, newBlog)
        this.setState({
          blogs: this.state.blogs.map(blog => blog._id !== _id ? blog : {
            user,
            likes: likes + 1,
            title,
            url,
            author,
            _id,
          })
        })
      } catch(exception) {
        console.log(exception)
      }
    }
  )

  deleteBlog = (blog) => (
    async () => {
      if (!window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
        return
      }
      try {
        await blogService.deleteBlog(blog._id)
        this.setState({
          blogs: this.state.blogs.filter(b => b._id !== blog._id)
        })
      } catch(exception) {
        console.log(exception)
        this.setState({
          error: `Unable to delete the blog for some reason (${exception})`,
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      }
    }
  )

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification
            message={this.state.notification}
          />
          <ErrorMessage
            message={this.state.error}
          />
          <LoginForm
            state={this.state}
            handleChange={this.handleFieldChange}
            login={this.login}
          />
        </div>
      )
    }
    return (
      <div>
        <h2>Blogs</h2>
        <Notification
          message={this.state.notification}
        />
        <ErrorMessage
          message={this.state.error}
        />
        {this.state.user.name} logged in
        <button onClick={this.logout}>Logout</button>
        <br></br>
        <Togglable buttonLabel='New blog' ref={component => this.blogForm = component}>
          <BlogForm
            state={this.state}
            handleChange={this.handleFieldChange}
            onSubmit={this.addBlog}
          />
        </Togglable>
        <br></br>
        {this.state.blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
          <Blog
            key={blog._id}
            blog={blog}
            addLike={this.addLike(blog)}
            deleteBlog={this.deleteBlog(blog)}
            currentUser={this.state.user}
          />
        )}
      </div>
    )
  }
}

export default App
