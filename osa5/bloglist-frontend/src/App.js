import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import Bloglist from './components/Bloglist'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const oldUser = window.localStorage.getItem('bloguser')
    if(oldUser !== null) setUser(JSON.parse(oldUser))
  }, [])

 const doLogin = async (username, password) => {

    try {
      const user = await loginService.login({userName: username, password: password})
      setUser(user)
      window.localStorage.setItem('bloguser', JSON.stringify(user))
    } catch (error) {
      console.log('Login error')
    }
 } 

 const logout = (event) => {
  event.preventDefault()
  setUser(null)
  window.localStorage.removeItem('bloguser')
}

 if(user === null) return(<><Login loginFunction = {doLogin}/></>)


  return (
    <div>
      User {user.name} logged in
      <button onClick={logout}>Logout</button>
      <Bloglist blogs={blogs}/>
    </div>
  )
}

export default App