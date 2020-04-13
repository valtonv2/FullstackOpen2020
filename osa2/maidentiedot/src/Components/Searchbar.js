import React from 'react'



const searchBar = ({currentState, changeHandler}) => {

return(

    <form>

        <input value = {currentState} onChange = {changeHandler} ></input>

    </form>

)

}

export default searchBar;