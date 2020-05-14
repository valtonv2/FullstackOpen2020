import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Bloglist = () => {

  const blogs = useSelector(state => state.blogs)

  const doList = (blogs) => {
    return(
      <div id = "bloglist">
        <Table striped>
          <tbody>
            {blogs.map(blog => <tr key={blog.id}><td><Link to={`blogs/${blog.id}`}>{blog.title}</Link></td></tr>)}
          </tbody>
        </Table>
      </div>
    )
  }

  return(
    <>
      {blogs && doList(blogs)}
    </>

  )

}

export default Bloglist