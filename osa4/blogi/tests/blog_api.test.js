const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, nonExistingId, blogsInDb, usersInDb } = require('./test_helper')

describe('when the database initially contains some blogs', () => {
  beforeAll( async () => {
    await Blog.deleteMany({})

    for (let blog of initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  describe('GET /api/blogs', () => {
    test('all blogs are returned as json', async () => {
      const blogsInDataBase = await blogsInDb()

      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.length).toBe(blogsInDataBase.length)
    })
  })

  describe('POST: add a new blog', () => {
    test('adding a new blog works as expected', async () => {
      const blogsAtStart = await blogsInDb()

      const newBlog = {
        title: 'Butter',
        author: 'Saara N.',
        url: 'https://lethemboyle.com/2018/07/02/butter/',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

      const titles = blogsAfterOperation.map(r => r.title)
      expect(titles).toContain('Butter')
    })

    test('adding a blog with no likes defined works properly', async () => {
      const newBlog = {
        title: 'Asparagus x 2',
        author: 'Saara N.',
        url: 'https://lethemboyle.com/2018/04/25/asparagus-x-2/'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      expect(response.body.likes).toBe(0)
    })

    test('trying to add a blog without a title or url causes status 400', async () => {
      const newBlog1 = {
        author: 'Saara N.',
        url: 'https://lethemboyle.com/2018/07/02/butter/',
        likes: 10
      }

      const newBlog2 = {
        title: 'Butter',
        author: 'Saara N.',
        likes: 10
      }

      const blogsAtStart = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(newBlog1)
        .expect(400)

      await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)

      const blogsAfterOperation = await blogsInDb()
      expect(blogsAtStart.length).toBe(blogsAfterOperation.length)
    })
  })

  describe('deletion of a blog', () => {
    let addedBlog

    beforeAll(async () => {
      let testBlog = new Blog({
        title: 'This blog will be deleted',
        author: 'Jari Avikainen',
        url: 'n/a',
        likes: 100
      })
      addedBlog = await testBlog.save()
    })

    test('deleting an existing blog works as expected', async () => {
      const blogsAtStart = await blogsInDb()
      await api
        .delete(`/api/blogs/${addedBlog.id}`)
        .expect(204)

      const blogsAfterOperation = await blogsInDb()

      const titles = blogsAfterOperation.map(b => b.title)

      expect(titles).not.toContain(addedBlog.title)
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length -1)
    })

    test('trying to delete a non-existing blog works as expected', async () => {
      const blogsAtStart = await blogsInDb()
      await api
        .delete(`/api/blogs/${await nonExistingId()}`)
        .expect(404)

      const blogsAfterOperation = await blogsInDb()
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })

    test('malformatted id is handled properly', async () => {
      const blogsAtStart = await blogsInDb()
      await api
        .delete('/api/blogs/xyz')
        .expect(400)

      const blogsAfterOperation = await blogsInDb()
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })
  })

  describe('updating a blog entry', () => {
    let addedBlog

    beforeAll(async () => {
      let testBlog = new Blog({
        title: 'This blog will be updated',
        author: 'Jari Avikainen',
        url: 'n/a',
        likes: 100
      })
      addedBlog = Blog.format(await testBlog.save())
    })

    test('updating an existing blog entry works as expected', async () => {
      const updatedBlog = { ...addedBlog, likes: 1000 }
      const blogsAtStart = await blogsInDb()
      await api
        .put(`/api/blogs/${addedBlog.id}`)
        .send(updatedBlog)
        .expect(204)

      const blogsAfterOperation = await blogsInDb()
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })

    test('trying to update a non-existing blog works as expected', async () => {
      const updatedBlog = { ...addedBlog, likes: 1000 }
      const blogsAtStart = await blogsInDb()
      await api
        .put(`/api/blogs/${await nonExistingId()}`)
        .send(updatedBlog)
        .expect(404)

      const blogsAfterOperation = await blogsInDb()
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
      expect(blogsAfterOperation).toEqual(blogsAtStart)
    })

    test('malformatted id is handled properly', async () => {
      const updatedBlog = { ...addedBlog, likes: 1000 }
      const blogsAtStart = await blogsInDb()
      await api
        .put('/api/blogs/xyz')
        .send(updatedBlog)
        .expect(400)

      const blogsAfterOperation = await blogsInDb()
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
      expect(blogsAfterOperation).toEqual(blogsAtStart)
    })

  })
})

describe.only('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret', adult: true })
    await user.save()
  })

  test('GET /api/users works as expected', async () => {
    const usersInDataBase = await usersInDb()

    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(usersInDataBase.length)
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
      adult: true
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  server.close()
})
