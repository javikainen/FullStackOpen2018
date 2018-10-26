const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(b => Blog.format(b)))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'title or URL missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  const savedBlog = await blog.save()
  response.status(201).json(Blog.format(savedBlog))
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const result = await Blog.deleteOne({ '_id': request.params.id })
    if (result.n === 1) {
      return response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    response.status(400).send(({ error: 'malformatted id' }))
  }
})

module.exports = blogsRouter
