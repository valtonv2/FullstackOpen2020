import React, { useState } from 'react'
import { login } from '../reducers/loginreducer'
import {useDispatch} from 'react-redux'

const Login = () => {

  const [username, setUserame] = useState('')
  const [password, setPassword] = useState('')

  const usernameChange = (event) => setUserame(event.target.value)
  const passwordChange = (event) => setPassword(event.target.value)

  const dispatch = useDispatch()

  const loginHelper = (event) => {
    event.preventDefault()
    dispatch(login(username, password))
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