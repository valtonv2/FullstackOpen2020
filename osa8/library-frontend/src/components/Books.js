import React from 'react'
import Select from 'react-select'

const Books = (props) => {

  if (!props.show) {
    return null
  }

  const books = props.books

  if(books.length === 0) return <div>Loading</div>

  const options = props.genres.map(g => {return({value: g, label: g})}).concat({value: 'all', label: 'All genres'})

  const doList = (bookArr) => {
    
    return bookArr.map( b => 
    
    <tr key={b.title}>
      <td>{b.title}</td>
      <td>{b.author.name}</td>
      <td>{b.published}</td>
    </tr>)

  }

 
  



  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {doList(books)}
        </tbody>
      </table>
      <h4>Choose genre</h4>
      <Select 
      value = {props.selectedGenre} 
      options = {options}
      onChange = {(selectedOption) => props.setGenre(selectedOption.value) }
      />
    </div>
  )
}

export default Books