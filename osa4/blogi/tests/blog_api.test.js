const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

beforeAll( async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('HTTP GET blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are six blogs', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(6)
  })

  test('the first blog is about react patterns', async () => {
    const response = await api
      .get('/api/blogs')

    expect(response.body[0].title).toBe('React patterns')
  })
})

describe('HTTP POST a new blog', () => {
  test('adding a new blog works as expected', async () => {
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

    const response = await api
      .get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain('Butter')
  })

  test('adding a blog with likes not defined works properly', async () => {
    const newBlog = {
      title: 'Asparagus x 2',
      author: 'Saara N.',
      url: 'https://lethemboyle.com/2018/04/25/asparagus-x-2/'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')

    const blog = response.body.find(r => r.title === 'Asparagus x 2')
    expect(blog.likes).toBe(0)
  })

})

afterAll(() => {
  server.close()
})
