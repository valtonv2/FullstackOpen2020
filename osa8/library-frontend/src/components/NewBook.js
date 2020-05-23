import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {CREATE_BOOK, ALL_AUTHORS, ALL_GENRES} from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


const [addBook] = useMutation(CREATE_BOOK, {
  refetchQueries: [{query: ALL_GENRES}, {query: ALL_AUTHORS}],
  onError: (error) => {
    const possibleError = error.graphQLErrors[0]
    if(possibleError){  
      props.errorFunction(possibleError.message, 5000)
    }else{
      props.errorFunction('Add error', 5000)
    }
  }
}
  
  )

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    
    console.log('add book...')
    addBook({variables:{title, author, published, genres}})

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook