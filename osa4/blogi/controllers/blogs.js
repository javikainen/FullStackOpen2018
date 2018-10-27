const jwt = require('jsonwebtoken')
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

  try {

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'title or URL missing' })
    }

    const user = await User.findOne({ '_id': decodedToken.id })

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(Blog.format(savedBlog))
  } catch(exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong... ' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blogToDelete = await Blog.findOne({ '_id': request.params.id })
    if (!blogToDelete) {
      return response.status(404).end()
    }

    if (blogToDelete.user.toString() !== decodedToken.id) {
      return response.status(401).json({ error: 'no delete rights' })
    }

    const result = await Blog.deleteOne({ '_id': request.params.id })
    if (result.n === 1) {
      return response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else if (exception.name === 'CastError') {
      response.status(400).send(({ error: 'malformatted id' }))
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong... ' })
    }
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
