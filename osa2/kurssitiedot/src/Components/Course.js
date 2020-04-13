import React from 'react'



const Header = ({text}) => {

    return(
       <h2>{text}</h2>

    )

}

const Content = ({partList}) => {

    return(
       <> 
       {partList.map(part => <Part coursePart = {part} key = {part.id} />)} 
       </>
   
    )
   
}

const Part = ({coursePart}) => {

   return(
       <p>{coursePart.name} {coursePart.exercises}</p>
       
   )
       
}


const Total = ({parts}) => {

 const sum = parts.map(part => part.exercises).reduce((a,b) => a+b, 0)
   return(
       
       <b>Total of {sum} exercises</b>
       
   )
       
       }

 const Course = ({course}) => {

   return(
     <div>
     <Header text = {course.name}/>
     <Content partList = {course.parts}/>
     <Total parts = {course.parts} /> 
   </div>
   )

 }

 export default Course