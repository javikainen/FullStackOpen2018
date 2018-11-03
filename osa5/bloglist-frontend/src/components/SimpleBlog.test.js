import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  let blogComponent

  const blog = {
    title: 'This is a test title',
    author: 'This is an imaginary author',
    likes: 42
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)
  })

  it('renders title, author and likecount', () => {
    const titleAuthorDiv = blogComponent.find('.titleAuthor')
    const likeCountDiv = blogComponent.find('.likes')

    expect(titleAuthorDiv.text()).toContain(`${blog.title} ${blog.author}`)
    expect(likeCountDiv.text()).toContain(blog.likes)
  })

  it('clicking the like button twice calls the event handler twice', () => {
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
