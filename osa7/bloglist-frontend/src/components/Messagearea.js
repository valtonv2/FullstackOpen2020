import React from 'react'
import {useSelector} from 'react-redux'
const Messagearea = () => {

  const message = useSelector(state => state.notification)

  if(message.content === '') return(null)

  if(!message.error){
    return(
      <div style={{ backgroundColor: 'green' }}>
        <p>{message.content}</p>
      </div>
    )
  }else{
    return(
      <div style={{ backgroundColor: 'red' }}>
        <p>{message.content}</p>
      </div>
    )
  }



}

export default Messagearea