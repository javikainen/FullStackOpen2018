let token = null
let config = null

const blogs = [
  {
    '_id': '5bd8ba16f1be3011c0fdfc56',
    'title': 'Go To Statement Considered Harmful',
    'author': 'Edsger W. Dijkstra',
    'url': 'n/a',
    'likes': 2,
    'user': {
      '_id': '5bd3179ab3f11e3ce7bc1fc4',
      'username': 'jariavik',
      'name': 'Jari Avikainen'
    },
    '__v': 0
  },
  {
    '_id': '5bd8ba80f1be3011c0fdfc57',
    'title': 'Canonical String Reduction',
    'author': 'Edsger W. Dijkstra',
    'url': 'n/a',
    'likes': 0,
    'user': {
      '_id': '5bd3179ab3f11e3ce7bc1fc4',
      'username': 'jariavik',
      'name': 'Jari Avikainen'
    },
    '__v': 0
  },
  {
    '_id': '5bd8be3ff1be3011c0fdfc58',
    'title': 'First class tests',
    'author': 'Robert C. Martin',
    'url': 'n/a',
    'likes': 0,
    'user': {
      '_id': '5bd3179ab3f11e3ce7bc1fc4',
      'username': 'jariavik',
      'name': 'Jari Avikainen'
    },
    '__v': 0
  },
  {
    '_id': '5bda03ceec1910164172652e',
    'title': 'TDD harms architecture',
    'author': 'Robert C. Martin',
    'url': 'n/a',
    'likes': 1,
    'user': {
      '_id': '5bd3179ab3f11e3ce7bc1fc4',
      'username': 'jariavik',
      'name': 'Jari Avikainen'
    },
    '__v': 0
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { 'Authorization': token }
  }
}

export default { getAll, setToken, blogs }
