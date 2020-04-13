import React from 'react'

const Notification = ({message, isError}) => {
   
     if(message === null){return null}
   
    else if(!isError){return(

        <div className = 'Notification'>
            {message}
        </div>

    )

    }else return(

        <div className = 'error'>
            {message}
        </div>


    )

}

export default Notification