import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (userdata) => {
  const response = await axios.post(baseUrl, userdata)
  console.log(response.data)
  return response.data
}

export default { login }