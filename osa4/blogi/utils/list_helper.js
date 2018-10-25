const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return sortedBlogs[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
