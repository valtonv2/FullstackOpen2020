 import React from 'react'
 
 
 const Personform = (props) =>{

      return(
        <form onSubmit={props.addFunction}>
        <div> name: <input value={props.currentName} onChange = {props.nameChangeHandler}/></div>
        <div> number: <input value = {props.currentNum} onChange = {props.numChangeHandler}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      )
    }

export default Personform