import React, { useState } from 'react'
import { updateBlog, deleteBlog } from '../reducers/blogreducer'
import {useDispatch} from 'react-redux'
const Blog = ({ blog, user }) => {

  const [isExpanded, setExpanded] = useState(false)

  const dispatch = useDispatch()

  const addLike = async (event) => {
    event.preventDefault()
    blog.likes = blog.likes + 1
     dispatch(updateBlog(blog))
  }

  const conditionalButton = { display: user.userName === blog.user.userName ? '':'none' }


  if(!isExpanded){
    return(
      <div className="closed">
        {blog.title} {blog.author}
        <button onClick={() => setExpanded(true)} id="expandbutton">View</button>
      </div>
    )
  }else{
    return(
      <div style = {{ border: 'solid' }} className="open">
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes}</p>
        <button onClick={addLike} id='likebutton'>like</button>
        <p>{blog.user.name}</p>
        <button style={conditionalButton} onClick={() => dispatch(deleteBlog(blog))}>Delete</button>
        <button onClick={() => setExpanded(false)}>Close</button>
      </div>
    )
  }
}
export default Blog
