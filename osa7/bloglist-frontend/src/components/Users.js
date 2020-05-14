import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {

  const users = useSelector(state => state.allUsers)

  const doList = (users) => {
    return(
      <div id = "userlist">
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Added blogs</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => <tr key={user.id}><td><Link to={`users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
          </tbody>
        </Table>
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