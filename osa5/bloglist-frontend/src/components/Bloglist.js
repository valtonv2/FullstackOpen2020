import React from 'react'
import Blog from './Blog'

const Bloglist = ({blogs, updateFunction, deleteFunction, user}) => {
    
    const doList = (blogs) => {
        console.log(blogs)
        return(
            <ul>
                {blogs.map(blog => <li key={blog.id}><Blog blog={blog} updateFunction={updateFunction} deleteFunction={deleteFunction} user={user} /></li>)}
            </ul>
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