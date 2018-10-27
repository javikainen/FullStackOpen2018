const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
  adult: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
  return {
    _id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User
