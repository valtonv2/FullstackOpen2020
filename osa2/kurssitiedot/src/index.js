import React from 'react'
import ReactDOM from 'react-dom'
import Course from './Components/Course'

const App = () => {
  const courses  = [{ 
   name: 'Half Stack application development',
   courseId: 1,
    parts: [
  {
    name: 'Fundamentals of React',
    exercises: 10,
    id: 1
  },
  {
    name: 'Using props to pass data',
    exercises: 7,
    id: 2
  },
  {
    name: 'State of a component',
    exercises: 13,
    id: 3
  }
 ]
},
{
  name: 'Node.js',
  courseId: 2,
  parts: [
    {
      name: 'Routing',
      exercises: 3,
      id: 1
    },
    {
      name: 'Middlewares',
      exercises: 7,
      id: 2
    }
  ]
}


]
  return (
  <>
    <h1>Web software developement</h1>
    <div>
        {courses.map(course => <Course course = {course} key = {course.courseId} />)}
    </div>
  </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))