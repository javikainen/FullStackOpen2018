import React from 'react'

const BlogForm = ({ state, handleChange, onSubmit }) => (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input
            type='text'
            name='blogTitle'
            value={state.blogTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          Author:
          <input
            type='text'
            name='blogAuthor'
            value={state.blogAuthor}
            onChange={handleChange}
          />
        </div>
        <div>
          Url:
          <input
            type='text'
            name='blogUrl'
            value={state.blogUrl}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )

export default BlogForm
