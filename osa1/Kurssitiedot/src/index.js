import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course  = { 
   name: 'Half Stack application development',
    parts: [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
 ]
}
  return (
    <div>
      <Header text = {course.name}/>
      <Content partList = {course.parts}/>
      <Total parts = {course.parts} /> 
    </div>
  )
}

const Header = ({text}) => {

     return(
        <h1>{text}</h1>

     )

}

const Content = ({partList}) => {

     return(
        <> 
        {partList.map(part => <Part coursePart = {part} />)} 
        </>
    
     )
    
}

const Part = ({coursePart}) => {

    return(
        <p>{coursePart.name} {coursePart.exercises}</p>
        
    )
        
}


const Total = ({parts}) => {

    return(
        
        <p>Total : {parts[0].exercises + parts[1].exercises + parts[2].exercises }</p>
        
    )
        
        }

ReactDOM.render(<App />, document.getElementById('root'))