import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import {useDispatch, useSelector} from 'react-redux'

const AnecdoteList = () => {

    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state)

    const voteAnecdote = (id) => {
        console.log('vote', id)
        dispatch(vote(id))
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
                    <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList