import userService from '../services/users'
import { notify } from './notificationreducer'

//ACTION CREATORS


export const initializeUsers = () => {

  return async (dispatch) => {
    try{

      const users = await userService.getAll()
      dispatch({ type: 'INITIALIZEUSER', data: users })

    }catch (error) {

      console.log('User init error')
      const errormessage = error.response.data.error ? error.response.data.error: error.message
      dispatch(notify(`User init error: ${errormessage}`, true, 5000))
    }
  }
}


const userreducer = (state = [], action) => {

  switch (action.type){

  case 'INITIALIZEUSER':
    return action.data

  default:
    return state
  }

}

export default userreducer