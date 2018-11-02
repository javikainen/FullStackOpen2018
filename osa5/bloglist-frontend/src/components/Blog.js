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

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility}>
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style={showWhenVisible}>
          <ul style={{ 'list-style-type': 'none' }}>
            <li><a href={this.props.blog.url}>{this.props.blog.url}</a></li>
            <li>{this.props.blog.likes} likes <button>Like</button></li>
            <li>Added by {this.props.blog.user.name}</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Blog
