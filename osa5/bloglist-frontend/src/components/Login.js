import React, { useState } from 'react'

const Login = ({ loginFunction }) => {

  const [username, setUserame] = useState('')
  const [password, setPassword] = useState('')

  const usernameChange = (event) => setUserame(event.target.value)
  const passwordChange = (event) => setPassword(event.target.value)

  const loginHelper = (event) => {
    event.preventDefault()
    loginFunction(username, password)
    setUserame('')
    setPassword('')
  }

  return(
    <div className='loginform'>
      <p>Login:</p>

      <form onSubmit = {loginHelper}>
        <label>
                    Username:
          <input type="text" value={username} onChange={usernameChange} id="username"></input>
        </label>
        <label>
                    Password:
          <input type="text" value={password} onChange={passwordChange} id="password"></input>
        </label>
        <input type="submit" value="Login" id="loginbutton"></input>
      </form>
    </div>
  )
}

export default Login