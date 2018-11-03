import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  let blogComponent

  const user = {
    name: 'Jari Avikainen',
    username: 'jariavik'
  }

  const blog = {
    title: 'This is a test title',
    author: 'This is an imaginary author',
    url: 'This is an imaginary url',
    likes: 42,
    user
  }

  const mockLikeHandler = jest.fn()
  const mockDeleteHandler = jest.fn()

  beforeEach(() => {
    blogComponent = shallow(
      <Blog
        blog={blog}
        currentUser={user}
        addLike={mockLikeHandler}
        deleteBlog={mockDeleteHandler}
      />
    )
  })

  it('before clicking renders only title and author', () => {
    const titleAuthorDiv = blogComponent.find('.titleAuthor')
    const extraDiv = blogComponent.find('.extraInfo')

    expect(titleAuthorDiv.text()).toContain(`${blog.title} ${blog.author}`)
    expect(extraDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking, the rest of the component is shown as well', () => {
    const titleAuthorDiv = blogComponent.find('.titleAuthor')
    titleAuthorDiv.simulate('click')
    const extraDiv = blogComponent.find('.extraInfo')
    expect(extraDiv.getElement().props.style).toEqual({ display: '' })
    expect(extraDiv.text()).toContain(blog.url)
    expect(extraDiv.text()).toContain(blog.likes)
    expect(extraDiv.text()).toContain(user.name)
  })

})
