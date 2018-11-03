import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  static propTypes = {
    addLike: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    const { user, likes, author, title, url } = this.props.blog

    const deletionAllowed = (currentUser, blog) => {
      return blog.user === undefined || currentUser.username === blog.user.username
    }

    const showWhenAllowed = { display: deletionAllowed(this.props.currentUser, this.props.blog) ? '' : 'none' }
    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility} className='titleAuthor'>
          {title} {author}
        </div>
        <div style={showWhenVisible} className='extraInfo'>
          <ul style={{ 'listStyleType': 'none' }}>
            <li><a href={url}>{url}</a></li>
            <li>{likes} likes <button onClick={this.props.addLike}>Like</button></li>
            <li>Added by {user === undefined ? 'anon' : user.name}</li>
            <li style={showWhenAllowed}><button onClick={this.props.deleteBlog}>Delete</button></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Blog
