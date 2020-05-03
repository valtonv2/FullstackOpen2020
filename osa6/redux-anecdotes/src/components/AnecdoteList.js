import React from 'react'
import {vote} from '../reducers/anecdoteReducer'
import {connect} from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const anecdotes = props.anecdotes.filter(a => a.content.includes(props.filter))

    const voteAnecdote = (anecdote) => {
        
        props.vote(anecdote)
        props.setNotification('You voted for anecdote: ' + anecdote.content, 5000)
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

const mapStateToProps = (state) => {

    return({
        anecdotes: state.anecdotes,
        filter: state.filter
    })

} 

const mapDispatchToProps = {
    vote,
    setNotification
}


export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)