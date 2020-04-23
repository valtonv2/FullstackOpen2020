import React from 'react'
import Blog from './Blog'

const Bloglist = ({blogs}) => {
    
    
    return(
        <>
        <h2>Blogs</h2>
        {blogs && blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </>
        
    )

}

export default Bloglist