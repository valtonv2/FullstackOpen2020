  
import React, {useState} from 'react'
import Select from 'react-select'
import {UPDATE_YEAR, ALL_AUTHORS} from '../queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {

  const [selectedAuthor, setSelected] = useState({value:null, label: 'select author'})
  const [birthYear, setYear] = useState('')

  const [updateYear] = useMutation(UPDATE_YEAR, {
    refetchQueries: [ {query: ALL_AUTHORS} ],
    onError: (error) => props.errorFunction('Update error', 5000)
   
  })

  const doSubmit = (event) => {

    event.preventDefault()
    console.log('Updating year')
    if(!selectedAuthor.value||birthYear === ''){
      props.errorFunction('Fill fields', 5000)
      return
    }
    updateYear({variables: {name: selectedAuthor.value.name, setBornTo: birthYear}})

  }

  if (!props.show) {
    return null
  }
  const authorStatus = props.authors

  if(authorStatus.loading) return <div>Loading</div>



  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authorStatus.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={doSubmit}>
      <Select 
      value = {selectedAuthor} 
      options = {authorStatus.data.allAuthors.map(a => {return({value: a, label: a.name})})}
      onChange = {(selectedOption) => setSelected(selectedOption) }
      />
      born<input type = 'number' value={birthYear} onChange = {(event) => {setYear(Number(event.target.value))}}/>
      <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default Authors
