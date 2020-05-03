
  
  //ACTION CREATORS

  export const setNotification = (content, time) => {

    return (dispatch) => {

      const timer = setTimeout(() => dispatch({type:'CLEAR'}), time)
      dispatch({type: 'DISPLAY', data: {content, timer}})
    }
  }
   
  const initialState = {content: '', timer: null}
  
  const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch(action.type){
  
      case 'DISPLAY':
        if(state.timer){
           clearTimeout(state.timer)
          }
        return {content: action.data.content, timer: action.data.timer}
        
      case 'CLEAR':
        return {content: '', timer: null}
      default:
        return state
  
    }
  
  }
  
  export default notificationReducer