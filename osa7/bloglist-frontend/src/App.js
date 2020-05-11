import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Login from './components/Login'
import Bloglist from './components/Bloglist'
import Blogform from './components/Blogform'
import Messagearea from './components/Messagearea'
import Togglearea from './components/Togglearea'
import { initializeBlogs } from './reducers/blogreducer'
import { initializeUsers } from './reducers/userreducer'
import { tryOld, logout } from './reducers/loginreducer'
import Users from './components/Users'



const App = () => {
  
  const dispatch = useDispatch()
  const user = useSelector(state => state.user) 


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(tryOld()) // Try old user
    dispatch(initializeUsers())
  }, [dispatch])


  const logoutHelper = (event) => {

    event.preventDefault()
    dispatch(logout())

  }

  if(user === null) return(
    <div>
      <Messagearea />
      <Login />
    </div>
  )


  return (
    <div>
      <Messagearea />
      User {user.name} logged in
      <button onClick={logoutHelper}>Logout</button>
      <Togglearea buttonLabel = 'Add blog'>
        <Blogform />
      </Togglearea>

      <Bloglist />
      <Users />
    </div>
  )
}

export default App