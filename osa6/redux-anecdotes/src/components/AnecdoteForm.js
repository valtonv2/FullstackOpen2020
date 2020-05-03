import React from 'react'
import {create} from '../reducers/anecdoteReducer'
import {connect} from 'react-redux'


const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {

        event.preventDefault()
        const newContent = event.target.anecdote.value
        console.log(newContent)
        event.target.anecdote.value = ''

        props.create({content: newContent, votes: 0})
    
    }
  
    return (
        <div>
            <form onSubmit={addAnecdote}>
                <h2>create new</h2>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    create
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)