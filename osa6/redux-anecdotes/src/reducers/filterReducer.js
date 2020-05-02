
  
  //ACTION CREATORS
  
  export const refreshFilter = (content) =>{
    return {type:'REFRESH', data: content }
  }
  
  const initialState = ''
  
  const filterReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
  
    switch(action.type){
  
        case 'REFRESH':
            return action.data
    
        default: 
            return state
        
    }
  
  }
  
  export default filterReducer