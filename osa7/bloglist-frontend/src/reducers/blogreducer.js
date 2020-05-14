import blogService from '../services/blogs'
import { notify } from './notificationreducer'


//ACTION CREATORS

export const addBlog = (blog) => {

  return async (dispatch) => {

    try{

      const addResult = await blogService.addOne(blog)
      dispatch({ type: 'ADD', data: addResult })
      dispatch(notify('Blog added succesfully', false, 5000))

    }catch (error) {
      console.log('Add error')
      const errormessage = error.response.data.error !== null ? error.response.data.error: error.message
      dispatch(notify(`Adding blog failed: ${errormessage}`, true, 5000))
    }
  }
}

export const updateBlog = (blog) => {

  return async (dispatch) => {
    try{
      const updateResult = await blogService.updateOne(blog)
      dispatch({ type: 'UPDATE', data: updateResult })
      dispatch(notify('Blog updated succesfully', false, 5000))

    }catch (error) {

      console.log('Update error')
      const errormessage = error.response.data.error ? error.response.data.error: error.message
      dispatch(notify(`Updating blog failed: ${errormessage}`, true, 5000))
    }
  }
}

export const doComment = (id, comment) => {

  return async (dispatch) => {
    try{

      const commentResult = await blogService.comment(id, comment)
      dispatch({ type: 'UPDATE', data: commentResult })
      dispatch(notify(`Blog ${commentResult.title} updated succesfully`, false, 5000))

    }catch (error) {

      console.log('Comment error')
      const errormessage = error.response.data.error ? error.response.data.error: error.message
      dispatch(notify(`Commenting blog failed: ${errormessage}`, true, 5000))
    }
  }
}

export const deleteBlog = (blog) => {

  return async (dispatch) => {
    try{

      if(window.confirm(`Delete blog ${blog.title} ?`)){

        await blogService.deleteOne(blog)
        dispatch({ type: 'DELETE', data: blog })
        dispatch(notify(`Blog ${blog.title} deleted succesfully`, false, 5000))

      }

    }catch (error) {

      console.log('Delete error')
      const errormessage = error.response.data.error !== null ? error.response.data.error: error.message
      dispatch(notify(`Deleting blog failed: ${errormessage}`, true, 5000))
    }
  }
}


export const initializeBlogs = () => {

  return async (dispatch) => {
    try{

      const blogs = await blogService.getAll()
      dispatch({ type: 'INITIALIZEBLOGS', data: blogs.sort(blogCompare) })


    }catch (error) {

      console.log('Init error')
      const errormessage = error.response.data.error ? error.response.data.error: error.message
      dispatch(notify(`Init error: ${errormessage}`, true, 5000))
    }
  }
}

const blogCompare = (a,b) => {

  if(a.likes < b.likes) return(1)
  else if(a.likes > b.likes) return(-1)
  else return(0)

}

const blogreducer = (state = [], action) => {

  switch (action.type){
  case 'ADD':
    return state.concat(action.data).sort(blogCompare)

  case 'UPDATE':
    return state.filter(b => b.id !== action.data.id).concat(action.data).sort(blogCompare)

  case 'DELETE':
    return state.filter(b => b.id !== action.data.id)

  case 'INITIALIZEBLOGS':
    return action.data

  default:
    return state
  }

}

export default blogreducer