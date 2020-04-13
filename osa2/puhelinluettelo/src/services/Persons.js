import axios from 'axios'

//const baseUrl = 'https://salty-chamber-83912.herokuapp.com/api/persons'
const baseUrl = '/api/persons'

const getAllData = () => {
    
return(axios.get(baseUrl).then(response => response.data))

}


const postNewData = newData => {

    const request = axios.post(baseUrl, newData)
    return request.then(response => response.data)

}

const deleteData = (id) => {

    return axios.delete(`${baseUrl}/${id}`)

}


const updateData = (id, dataObj) => {

   return axios.put(`${baseUrl}/${id}`, dataObj).then(response => response.data)

}

export default {getAllData, postNewData, updateData, deleteData}