
  
  //ACTION CREATORS

  export const setNotification = (content, time) => {

    return (dispatch) => {

      dispatch({type: 'DISPLAY', data: content})
      setTimeout(() => dispatch({type:'CLEAR'}), time)

    }
  }
   
  const initialState = ''
  
  const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch(action.type){
  
      case 'DISPLAY':
        return action.data
        
      case 'CLEAR':
        return ''
      default:
        return state
  
    }
  
  }
  
  export default notificationReducer