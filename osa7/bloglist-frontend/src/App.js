import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Login from './components/Login'
import Bloglist from './components/Bloglist'
import Blogform from './components/Blogform'
import Messagearea from './components/Messagearea'
import Togglearea from './components/Togglearea'
import { initializeBlogs } from './reducers/blogreducer'
import { initializeUsers } from './reducers/userreducer'
import { tryOld } from './reducers/loginreducer'
import Users from './components/Users'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import Navigationbar from './components/Navigationbar'



const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.allUsers)


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(tryOld()) // Try old user
    dispatch(initializeUsers())
  }, [dispatch])


  const blogMatch = useRouteMatch('/blogs/:id')
  const userMatch = useRouteMatch('/users/:id')

  const foundBlog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null
  const foundUser = userMatch ? users.find(user => user.id === userMatch.params.id) : null

  if(user === null) return(
    <div>
      <Messagearea />
      <Login />
    </div>
  )


  return (
    <div className="container">
      <Navigationbar padding={5} user={user} />
      <Messagearea />
      <Switch>
        <Route path='/users/:id'>
          <User user={foundUser} />
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog={foundBlog} user={user} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <h2>Blogs</h2>
          <Togglearea buttonLabel = 'Add blog'>
            <Blogform />
          </Togglearea>
          <Bloglist />
        </Route>
      </Switch>

    </div>
  )
}

export default App