import axios from 'axios'

const baseurl = 'http://localhost:3001/anecdotes/'

const getall = async() => {

    const response = await axios.get(baseurl)
    return response.data

} 

const addone = async(anecdote) => {

    const response = await axios.post(baseurl, anecdote)
    return response.data

}

const updateone = async (anecdote) =>{
    const response = await axios.put(baseurl+anecdote.id, anecdote)
    return response.data
}

export default {getall, addone, updateone}