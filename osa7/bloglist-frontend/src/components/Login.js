import React, { useState } from 'react'
import { login } from '../reducers/loginreducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

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

      <Form onSubmit = {loginHelper}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={usernameChange} id="username" />
          <Form.Label>Password:</Form.Label>
          <Form.Control type="text" value={password} onChange={passwordChange} id="password"/>
          <Button type="submit" id="loginbutton" variant='primary'>Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login