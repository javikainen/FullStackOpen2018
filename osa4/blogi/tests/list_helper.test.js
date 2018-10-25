const listHelper = require('../utils/list_helper')

describe('list helpers', () => {
  test('dummy is called', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  const listWithOneBlog = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }
  ]

  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

  describe('total likes', () => {

    test('of empty list is zero', () => {
      expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
      expect(listHelper.totalLikes(listWithOneBlog)).toBe(7)
    })

    test('of a bigger list is calculated right', () => {
      expect(listHelper.totalLikes(blogs)).toBe(36)
    })

  })

  describe('favoriteBlog', () => {

    test('works correctly with an empty list', () => {
      expect(listHelper.favoriteBlog([])).toBe(undefined)
    })

    test('returns the correct blog for a bigger list', () => {
      expect(listHelper.favoriteBlog(blogs)).toEqual({
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      })
    })

    test('does not affect the original list', () => {
      listHelper.favoriteBlog(blogs.slice(1, 4))
      expect(blogs.slice(1, 4)).toEqual([
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
          _id: '5a422b3a1b54a676234d17f9',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0
        },
        {
          _id: '5a422b891b54a676234d17fa',
          title: 'First class tests',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
          likes: 10,
          __v: 0
        }
      ])
    })
  })

  describe('mostBlogs', () => {
    test('works correctly with an empty list', () => {
      expect(listHelper.mostBlogs([])).toBe(undefined)
    })

    test('works correctly with a bigger list', () => {
      expect(listHelper.mostBlogs(blogs)).toEqual({
        author: 'Robert C. Martin',
        blogs: 3
      })
    })
  })

  describe('mostLikes', () => {
    test('works correctly with an empty list', () => {
      expect(listHelper.mostLikes([])).toBe(undefined)
    })

    test('works correctly with a bigger list', () => {
      expect(listHelper.mostLikes(blogs)).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 17
      })
    })
  })
})
