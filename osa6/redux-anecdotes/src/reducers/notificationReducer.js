
  
  //ACTION CREATORS
  
  export const display = (content) => {
    return {type: 'DISPLAY', data: content}
  } 
  
  export const clear = () =>{
    return {type:'CLEAR'}
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