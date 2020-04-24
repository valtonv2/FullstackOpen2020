import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import Bloglist from './components/Bloglist'
import loginService from './services/login'
import Blogform from './components/Blogform'
import Messagearea from './components/Messagearea'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [announcement, setAnnouncement] = useState(null)
  const [isError, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
    setBlogs(blogs.concat(addResult))

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
      <Blogform addFunction={addBlog}/>
      <Bloglist blogs={blogs}/>
    </div>
  )
}

export default App