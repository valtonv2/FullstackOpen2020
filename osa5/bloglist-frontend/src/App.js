import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import Bloglist from './components/Bloglist'
import loginService from './services/login'
import Blogform from './components/Blogform'
import Messagearea from './components/Messagearea'
import Togglearea from './components/Togglearea'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [announcement, setAnnouncement] = useState(null)
  const [isError, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(blogCompare) )
    )  
  }, [])

  useEffect(() => {
    const oldUser = window.localStorage.getItem('bloguser')
    if(oldUser !== null){
      setUser(JSON.parse(oldUser))
      blogService.setToken(JSON.parse(oldUser).token)
    }
  }, [])

 const doLogin = async (username, password) => {

    try {
      const user = await loginService.login({userName: username, password: password})
      console.log(user)
      setUser(user)
      window.localStorage.setItem('bloguser', JSON.stringify(user))
      blogService.setToken(user.token)

      setAnnouncement('Login succesful')
      setTimeout(() => {setAnnouncement(null)}, 5000)


    } catch (error) {
      console.log('Login error', error.message)

      const errormessage = error.response.data.error != null ? error.response.data.error : error.message

      setAnnouncement(`Login failed: ${errormessage}`)
      setError(true)
      setTimeout(() => {setAnnouncement(null); setError(false)}, 5000)
      
    }
 } 

 const logout = (event) => {

    event.preventDefault()
    setUser(null)
    blogService.setToken(null)

  window.localStorage.removeItem('bloguser')
}

const addBlog = async (blog) => {
  try{

    
    const addResult = await blogService.addOne(blog)
    setBlogs(blogs.concat(addResult).sort(blogCompare))

    setAnnouncement('Blog added succesfully')
    setTimeout(() => {setAnnouncement(null)}, 5000)
    

  }catch (error) {
      console.log('Add error')
      
      const errormessage = error.response.data.error != null ? error.response.data.error: error.message

      setAnnouncement(`Adding blog failed: ${errormessage}`)
      setError(true)
      setTimeout(() => {setAnnouncement(null); setError(false)}, 5000)
  }
}

const updateBlog = async (blog) => {
  try{

    
    const updateResult = await blogService.updateOne(blog)
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs.sort(blogCompare))
    setAnnouncement('Blog updated succesfully')
    setTimeout(() => {setAnnouncement(null)}, 5000)
    
    

  }catch (error) {
      console.log('Update error')
      
      const errormessage = error.response.data.error ? error.response.data.error: error.message

      setAnnouncement(`Updating blog failed: ${errormessage}`)
      setError(true)
      setTimeout(() => {setAnnouncement(null); setError(false)}, 5000)
  }
}

const deleteBlog = async (blog) => {
  try{

    
    const deleteResult = await blogService.deleteOne(blog)
    setBlogs(blogs.filter(oneblog => oneblog.id !== blog.id))

    setAnnouncement('Blog deleted succesfully')
    setTimeout(() => {setAnnouncement(null)}, 5000)
    
    

  }catch (error) {
      console.log('Delete error')
      
      const errormessage = error.response.data.error != null ? error.response.data.error: error.message

      setAnnouncement(`Deleting blog failed: ${errormessage}`)
      setError(true)
      setTimeout(() => {setAnnouncement(null); setError(false)}, 5000)
  }
}

const blogCompare = (a,b) => {

  if(a.likes < b.likes) return(1)
  else if(a.likes > b.likes) return(-1)
  else return(0)

}


 if(user === null) return(
  <div>
    <Messagearea message={announcement} error={isError}/>
    <Login loginFunction = {doLogin}/>
  </div>
 )


  return (
    <div>
      <Messagearea message={announcement} error={isError} />
      User {user.name} logged in
      <button onClick={logout}>Logout</button>
        <Togglearea buttonLabel = 'Add blog'>
        <Blogform addFunction={addBlog}/>
      </Togglearea>
      
      <Bloglist blogs={blogs} updateFunction={updateBlog} deleteFunction={deleteBlog} user={user}/>
    </div>
  )
}

export default App