import React from 'react'
import { updateBlog, deleteBlog } from '../reducers/blogreducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import CommentForm from './Commentform'

const Blog = ({ blog, user }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const addLike = async (event) => {
    event.preventDefault()
    blog.likes = blog.likes + 1
    blog.comments = blog.comments.map(c => c.id)
    dispatch(updateBlog(blog))
  }

  const deleteFunction = (event) => {
    event.preventDefault()
    dispatch(deleteBlog(blog))
    history.push('/')
  }

  if(!blog || !user) return null

  const conditionalButton = { display: user.userName === blog.user.userName ? '':'none' }

  return(
    <div style = {{ border: 'solid' }} className="open">
      <h3>{blog.title} {blog.author}</h3>
      <p>{blog.url}</p>
      <p>Likes {blog.likes}</p>
      <button onClick={addLike} id='likebutton'>like</button>
      <p>Added by {blog.user.name}</p>
      <button style={conditionalButton} onClick={deleteFunction}>Delete</button>
      <h4>Comments</h4>
      <CommentForm blog={blog} />
      <ul>{blog.comments.map(c => <li key={c.id}>{c.content}</li>)}</ul>
    </div>
  )
}

export default Blog
