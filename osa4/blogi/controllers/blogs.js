const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: 'title or URL missing' })
  }

  const user = await User.findOne({})
  const userId = user._id

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: userId
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

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

blogsRouter.put('/:id', async (request, response) => {
  try {
    const blog = request.body
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).json({ error: 'title or URL missing' })
    }
    delete(blog.id)
    const result = await Blog.findOneAndUpdate({ '_id': request.params.id }, blog)
    if (result) {
      return response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    response.status(400).send(({ error: 'malformatted id' }))
  }
})

module.exports = blogsRouter
