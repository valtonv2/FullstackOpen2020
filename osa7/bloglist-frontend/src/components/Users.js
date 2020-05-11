import React from 'react'
import {useSelector} from 'react-redux'

const Users = () => {

  const users = useSelector(state => state.allUsers)

  const doList = (users) => {
    return(
      <div id = "userlist">
        <ul>
    {users.map(user => <li key={user.id}>{user.name}   {user.blogs.length}</li>)}
        </ul>
      </div>
    )
  }

  return(
    <>
      <h2>Users</h2>
      {users && doList(users)}
    </>

  )

}

export default Users