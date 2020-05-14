import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs/'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addOne = async (blog) => {

  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, blog, config)
  console.log('Add response: ', response.data)
  return response.data
}

const updateOne = async (blog) => {

  const config = { headers: { Authorization: token } }

  const response = await axios.put(baseUrl+blog.id, blog, config)
  console.log('Update response: ', response.data)
  return response.data
}

const deleteOne = async (blog) => {

  const config = { headers: { Authorization: token } }

  const response = await axios.delete((baseUrl+blog.id), config)
  return response.data
}

const comment = async (id, comment) => {

  const response = await axios.post(baseUrl+`${id}/comments`, { id, content: comment })
  return response.data

}

export default { getAll, addOne, updateOne, setToken, deleteOne, comment }