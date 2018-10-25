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

const mostBlogs = (blogs) => {
  const blogCounts = {}
  const bestAuthor = { author: 'None', blogs: 0 }
  blogs.forEach(blog => {
    const author = blog.author
    const blogsSoFar = blogCounts[author]
    if (blogsSoFar) {
      blogCounts[author] = blogsSoFar + 1
    } else {
      blogCounts[author] = 1
    }
    if (blogCounts[author] > bestAuthor.blogs) {
      bestAuthor.author = author
      bestAuthor.blogs = blogCounts[author]
    }
  })
  return bestAuthor.blogs === 0 ? undefined : bestAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
