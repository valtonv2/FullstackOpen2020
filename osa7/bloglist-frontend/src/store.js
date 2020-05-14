import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogreducer from './reducers/blogreducer'
import notificationreducer from './reducers/notificationreducer'
import loginreducer from './reducers/loginreducer'
import thunk from 'redux-thunk'
import userreducer from './reducers/userreducer'

const reducer = combineReducers(
  {
    blogs: blogreducer,
    notification: notificationreducer,
    user: loginreducer,
    allUsers: userreducer
  }
)

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store