import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      const loginDiv = app.find('.loginView')
      const bloglistDiv = app.find('.blogView')
      expect(loginDiv.exists()).toBeTruthy()
      expect(bloglistDiv.exists()).toBeFalsy()

    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
      const user = {
        username: 'tester',
        token: '12341234',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    })

    it('login form is not rendered', () => {
      app.update()
      const loginDiv = app.find('.loginView')
      expect(loginDiv.exists()).toBeFalsy()
    })

    it('all notes received from the backend are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })

})
