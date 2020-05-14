import React from 'react'

const User = ({ user }) => {

  if(!user) return null

  return(
    <div style = {{ border: 'solid' }} className="open">
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

export default User
