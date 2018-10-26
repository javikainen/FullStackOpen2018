const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')

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

  afterAll(() => {
    server.close()
  })

})
