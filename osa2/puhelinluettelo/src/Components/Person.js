import React from 'react'

const Person = ({name, number, deleteFunction, ident}) => {

return( 
<div>
<p>{name}  {number}</p> <button onClick={() => deleteFunction(ident)}>Delete</button>
</div>
)

}

export default Person