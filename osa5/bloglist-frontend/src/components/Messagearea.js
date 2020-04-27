import React from 'react'
const Messagearea = ({ message, error }) => {

  if(message === null) return(null)

  if(!error){
    return(
      <div style={{ backgroundColor: 'green' }}>
        <p>{message}</p>
      </div>
    )
  }else{
    return(
      <div style={{ backgroundColor: 'red' }}>
        <p>{message}</p>
      </div>
    )
  }



}

export default Messagearea