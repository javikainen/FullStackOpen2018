import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
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

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility}>
          {title} {author}
        </div>
        <div style={showWhenVisible}>
          <ul style={{ 'listStyleType': 'none' }}>
            <li><a href={url}>{url}</a></li>
            <li>{likes} likes <button onClick={this.props.addLike}>Like</button></li>
            <li>Added by {user.name}</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Blog
