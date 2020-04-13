 import React from 'react'
 
 
 const Filterform = (props) =>{

      return(
      <form>
        <div>Filter shown with <input value = {props.filterLetters} onChange = {props.changeHandler}/></div>

      </form>
      )
    }

export default Filterform