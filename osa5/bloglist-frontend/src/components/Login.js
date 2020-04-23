import React, {useState} from 'react'

const Login = ({loginFunction}) => {

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
            <>
            <p>Login:</p>

            <form onSubmit = {loginHelper}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={usernameChange}></input>
                </label>
                <label>
                    Password:
                    <input type="text" value={password} onChange={passwordChange}></input>
                </label>
                <input type="submit" value="Login"></input>
            </form>
            </>
        )
}

export default Login