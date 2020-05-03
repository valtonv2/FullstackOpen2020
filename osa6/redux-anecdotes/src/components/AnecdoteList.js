import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import {useDispatch, useSelector} from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()

    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes).filter(a => a.content.includes(filter))

    const voteAnecdote = (anecdote) => {
        
        dispatch(vote(anecdote))
        dispatch(setNotification('You voted for anecdote: ' + anecdote.content, 5000))
    }

    return(
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => voteAnecdote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList