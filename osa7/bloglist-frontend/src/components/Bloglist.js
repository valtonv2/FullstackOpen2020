import React from 'react'
import Blog from './Blog'
import {useSelector} from 'react-redux'

const Bloglist = () => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const doList = (blogs) => {
    return(
      <div id = "bloglist">
        <ul>
          {blogs.map(blog => <li key={blog.id}><Blog blog={blog} user={user} /></li>)}
        </ul>
      </div>
    )
  }

  return(
    <>
      <h2>Blogs</h2>
      {blogs && doList(blogs)}
    </>

  )

}

export default Bloglist