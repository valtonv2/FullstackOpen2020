
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import {useQuery, useLazyQuery, useSubscription, useApolloClient } from '@apollo/client'
import {ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, CURRENT_USER, GENRE_BOOKS, BOOK_ADDED} from './queries'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('books')
  const [error, setError] = useState('')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [books, setBooks] = useState([])
  const [recommendedBooks, setRecommended] = useState([])
  const [selectedGenre, setGenre] = useState('all')
  const [allGenres, setAllGenres] = useState([])

  const client = useApolloClient()

  //Book update subscription
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      console.log('Sub data', subscriptionData)
      const newBooks = books.concat(subscriptionData.data.bookAdded)
      console.log('New books')
      window.alert('New books have been added!')
      setBooks(newBooks)
    }
  })


  //Normal queries

  const authors = useQuery(ALL_AUTHORS)

  const genres = useQuery(ALL_GENRES) //{onCompleted: (res) => setAllGenres([...new Set(res.allBooks.map(b => b.genres).flat())])})

  const initBooks = useQuery(ALL_BOOKS)
  

  //Lazy queries

  const [getUserFunction] = useLazyQuery(CURRENT_USER, {
    onError: (err) => {
      console.log('User fetch error', err)
      doError(err, 5000)},

      onCompleted: (response) => {
      console.log('User fetch result', response)
      setUser(response.me)
      fetchRecommendedBooks({variables: {genre: response.me.favoriteGenre}})
    }

  })



  const [fetchGenreBooks] = useLazyQuery(GENRE_BOOKS, {
    onCompleted: (response) => {
      setBooks(response.allBooks)
      console.log('Books fetched', response.allBooks)
    }
  })


  const [fetchRecommendedBooks] = useLazyQuery(GENRE_BOOKS, {
    onCompleted: (response) => setRecommended(response.allBooks)
  })

  //Effects
  
  //At startup
  useEffect(() => {

    const oldToken = localStorage.getItem('library-token')
    if(oldToken) {
      setToken(oldToken)
      console.log('Found old token and set it')
    }
  }, [])

  //Handle genre update
  useEffect(() => {

    if(genres.data){
      setAllGenres([...new Set(genres.data.allBooks.map(b => b.genres).flat())])
    }

   
  }, [genres.data])

  //Fetch new user data when token changes
  useEffect(() => {
    
    if(token) {
      console.log('Detect token change. Fetch user.')
      console.log('Token is in local storage: ', localStorage.getItem('library-token'))
      getUserFunction()
     
    }
  }, [token, getUserFunction])


  //Fetch books again when genre changes
  useEffect(() => {
    
    fetchGenreBooks({variables: {genre: selectedGenre}})
    
  }, [selectedGenre, fetchGenreBooks])
 

//Utility methods

  const doError = (message, time) => {

    setError(message)
    setTimeout(() => setError(''), time)

  }

  const logout = (event) => {

    event.preventDefault()

    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
    console.log('Logout complete')
  }

  //Rendering

  if(token === null){

    return(
    <div>
      <div>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>
      {error}

      <Books
        show={page === 'books'}
        books={books}
        genres={allGenres}
      />

      <LoginForm 
        show={page === 'login'}
        setError={doError}
        setToken={setToken}
        setUser={setUser}
        getUser={getUserFunction}
      />

    </div>)

  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>
      {error}
      <Authors
        show={page === 'authors'}
        authors={authors}
        errorFunction = {doError}
      />

      <Books
        show={page === 'books'}
        books={books}
        setGenre={setGenre}
        selectedGenre={selectedGenre}
        genres={allGenres}
      />

      <NewBook
        show={page === 'add'}
        errorFunction={doError}
        bookFetchFunction={initBooks.refetch}
      />

      <Recommended
        show={page === 'recommended'}
        genre={user && user.favoriteGenre}
        books={recommendedBooks}

      />

    </div>
  )
}

export default App