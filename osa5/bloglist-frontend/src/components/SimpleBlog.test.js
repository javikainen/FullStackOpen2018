import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders title, author and likecount', () => {
    const blog = {
      title: 'This is a test title',
      author: 'This is an imaginary author',
      likes: 42
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleAuthorDiv = blogComponent.find('.titleAuthor')
    const likeCountDiv = blogComponent.find('.likes')

    expect(titleAuthorDiv.text()).toContain(`${blog.title} ${blog.author}`)
    expect(likeCountDiv.text()).toContain(blog.likes)
  })
})
