const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

morgan.token('reqbody', (req) => {
  return JSON.stringify(req.body)
})

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const mongoUrl = process.env.MONGODB_URI

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then( () => {
    console.log('connected to database', process.env.MONGODB_URI)
  })
  .catch(err => {
    console.log(err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :reqbody :status :res[content-length] - :response-time ms'))

app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
