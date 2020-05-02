const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

//ACTION CREATORS

export const create = (newContent) => {
  return {type: 'CREATENEW', data: newContent}
} 

export const vote = (id) =>{
  return {type:'VOTE', data:{id: id}}
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const compare = (a,b) =>{

  if(a.votes > b.votes) return -1
  else if(a.votes === b.votes) return 0
  else return 1

} 


const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){

    case 'VOTE':
      const votedAnecdote = state.find(a => a.id === action.data.id)
      votedAnecdote.votes += 1
      return state.filter(a => a.id !== action.data.id).concat(votedAnecdote).sort(compare)
      
    case 'CREATENEW':
      return state.concat(asObject(action.data))
    default:
      return state

  }

}

export default reducer