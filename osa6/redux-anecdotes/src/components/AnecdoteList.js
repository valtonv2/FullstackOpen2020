import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import {useDispatch, useSelector} from 'react-redux'
import {display, clear} from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()

    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes).filter(a => a.content.includes(filter))

    const voteAnecdote = (id) => {
        console.log('vote', id)
        dispatch(vote(id))

        const anecdote = anecdotes.find(a => a.id === id)
        dispatch(display('You voted for anecdote: ' + anecdote.content))
        setTimeout(() => dispatch(clear()), 5000)
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