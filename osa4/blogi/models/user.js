const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
  adult: Boolean
})

userSchema.statics.format = (user) => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User
