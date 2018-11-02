const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  try {

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (title === undefined || url === undefined) {
      return response.status(400).json({ error: 'url or title missing' })
    }

    const user = await User.findOne({ '_id': decodedToken.id })

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
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
  const blogToDelete = await Blog.findOne({ '_id': request.params.id })

  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (!blogToDelete) {
      return response.status(404).end()
    }

    if (blogToDelete.user && blogToDelete.user.toString() !== decodedToken.id) {
      return response.status(401).json({ error: 'only creator can delete a blog' })
    }

    await Blog.deleteOne({ '_id': request.params.id })
    response.status(204).end()
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
    const { title, author, url, likes } = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (title === undefined || url === undefined) {
      return response.status(400).json({ error: 'title or URL missing' })
    }

    const blogToUpdate = await Blog.findOne({ '_id': request.params.id })
    if (!blogToUpdate) {
      return response.status(404).end()
    }

    if (blogToUpdate.user.toString() !== decodedToken.id) {
      return response.status(401).json({ error: 'only creator can edit a blog' })
    }

    const result = await Blog.findOneAndUpdate({ '_id': request.params.id }, { title, author, url, likes }, { new: true })
    if (result) {
      return response.send(result)
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

module.exports = blogsRouter
