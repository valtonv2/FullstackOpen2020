import React, {useState} from 'react'
import { useMutation} from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({show, setError, setToken, getUser}) => {
 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useMutation(LOGIN, {
        onError: (error) => setError(error.graphQLErrors[0].message),
        onCompleted: (response) => {
          console.log('Loginresponse: ', response)
          if(response.login){
            const token = response.login.value
            localStorage.setItem('library-token', token)
            setToken(token)
            console.log('Set token', token)
          }
        } 
    })

    /*
    useEffect(() => {
        if(loginresult.data){
            const token = loginresult.data.login.value
            setToken(token)
            localStorage.setItem('library-token', token)
            console.log('Set token', token)
            getUser()
        }
    }, [loginresult.data, setToken])
*/

    const submit = (event) => {

        event.preventDefault()

        login({variables: {username, password}})

    }

    if(!show) return null
 
  return (
    <div>
      <h2>Login</h2>
        <form onSubmit={submit}>
          username  <input value={username} onChange={(event) => setUsername(event.target.value)} />
          password  <input value={password} type='password' onChange={(event) => setPassword(event.target.value)} />
            <button type='submit'>login</button>
        </form>
     
    </div>
  )
}

export default LoginForm