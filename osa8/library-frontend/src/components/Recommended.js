import React from 'react'


const Recommended = ({genre, show, books}) => {


  if (!show) {
    return null
  }

  if(books.length === 0) return <div>Loading</div>


  const doList = (books) => {
    
    return books.map( b => 
    
    <tr key={b.title}>
      <td>{b.title}</td>
      <td>{b.author.name}</td>
      <td>{b.published}</td>
    </tr>)

  }

 
  return (
    <div>
      <h2>Recommendations</h2>

  <p>Books in your favorite genre {genre}</p>

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
          {doList(books.filter(b => b.genres.includes(genre)))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended