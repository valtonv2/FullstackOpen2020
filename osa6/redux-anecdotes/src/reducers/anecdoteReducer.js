import anecdoteService from "../services/anecdoteService"

//ACTION CREATORS
export const create = (newAnecdote) => {
  return async (dispatch) => { 
    const addResult = await anecdoteService.addone(newAnecdote)
    dispatch({type: 'CREATENEW', data: addResult})
  }
} 

export const vote = (anecdote) =>{
  return async (dispatch) => {
    
    const updatedAnecdote = {...anecdote, votes: anecdote.votes+1}
    const updateResult = await anecdoteService.updateone(updatedAnecdote)
    dispatch({type:'VOTE', data:updateResult})

  } 
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getall()
    dispatch({type:'INITIALIZE_ANECDOTES', data: anecdotes.sort(compare)})
  }
} 

const initialState = []

const compare = (a,b) =>{

  if(a.votes > b.votes) return -1
  else if(a.votes === b.votes) return 0
  else return 1

} 


const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){

    case 'VOTE':
      return state
      .filter(a => a.id !== action.data.id)
      .concat(action.data)
      .sort(compare)
      
    case 'CREATENEW':
      return state.concat(action.data)

    case 'INITIALIZE_ANECDOTES':
      return action.data
    
    default:
      return state

  }

}

export default anecdoteReducer