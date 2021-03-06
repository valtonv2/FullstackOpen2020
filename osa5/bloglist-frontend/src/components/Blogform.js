import React, { useState } from 'react'

const Blogform = ({ addFunction }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const titleChange = (event) => setTitle(event.target.value)
  const authorChange = (event) => setAuthor(event.target.value)
  const urlChange = (event) => setUrl(event.target.value)

  const addHelper = (event) => {
    event.preventDefault()
    addFunction({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <>
      <p>Add new blog</p>

      <form onSubmit = {addHelper}>
        <label>
                    title:
          <input type="text" id="title" value={title} onChange={titleChange}></input>
        </label>
        <label>
                    author:
          <input type="text" id="author" value={author} onChange={authorChange}></input>
        </label>
        <label>
                    url:
          <input type="text" id="url" value={url} onChange={urlChange}></input>
        </label>
        <input type="submit" value="Add" id="addbutton"></input>
      </form>
    </>
  )
}

export default Blogform