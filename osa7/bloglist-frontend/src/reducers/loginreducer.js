import blogService from '../services/blogs'
import loginService from '../services/login'
import { notify } from './notificationreducer'


//ACTION CREATORS

export const login = (username, password) => {

  return async (dispatch) => {
    try {
      const user = await loginService.login({ userName: username, password: password })
      console.log(user)
      window.localStorage.setItem('bloguser', JSON.stringify(user))
      blogService.setToken(user.token)

      notify('Login succesful', false, 5000)
      dispatch({ type: 'LOGIN', data: user })



    } catch (error) {
      console.log('Login error', error.message)

      const errormessage = error.response.data.error !== null ? error.response.data.error : error.message

      notify(`Login failed: ${errormessage}`, true, 5000)
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: 'LOGOUT' })
    blogService.setToken(null)
    window.localStorage.removeItem('bloguser')
  }
}

export const tryOld = () => {

  return (dispatch) => {
    const oldUser = window.localStorage.getItem('bloguser')
    if(oldUser !== null){
      dispatch({ type: 'LOGIN', data: JSON.parse(oldUser) })
      blogService.setToken(JSON.parse(oldUser).token)
    }else{
      console.log('No old user.')
    }
  }
}


const loginreducer = (state = null, action) => {

  switch (action.type){
  case 'LOGIN':
    return action.data

  case 'LOGOUT':
    return null

  default:
    return state

  }

}

export default loginreducer