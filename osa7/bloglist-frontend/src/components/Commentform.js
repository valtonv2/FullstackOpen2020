import React, { useState } from 'react'
import { doComment } from '../reducers/blogreducer'
import { useDispatch } from 'react-redux'

const Commentform = ({ blog }) => {

  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const commentChange = (event) => setComment(event.target.value)


  const commentHelper = (event) => {
    event.preventDefault()
    dispatch(doComment(blog.id, comment))
    setComment('')
  }

  return(
    <>
      <p>Add new comment</p>

      <form onSubmit = {commentHelper}>
        <label>
                    Add comment:
          <input type="text" id="comment" value={comment} onChange={commentChange}></input>
        </label>
        <input type="submit" value="Comment" id="addbutton" />
      </form>
    </>
  )
}

export default Commentform