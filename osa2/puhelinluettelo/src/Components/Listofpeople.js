import React from 'react'
import Person from './Person'

//Komponentti joka renderöi ihmislistan. 
const Listofpeople = ({list, deleteFunction}) => {

    return(
    
      <div>{list.map(dataItem => <Person key = {dataItem.name} name = {dataItem.name} number = {dataItem.number} deleteFunction = {deleteFunction} ident = {dataItem.id}/>)}</div>
    
    )

}

export default Listofpeople