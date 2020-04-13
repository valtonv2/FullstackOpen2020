import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text = {'Good'} handler = {() => setGood(good + 1)}/>  <Button text = {'Neutral'} handler = {() => setNeutral(neutral + 1)}/>  <Button text = {'Bad'} handler = {() => setBad(bad + 1)}/>

      <Statistics good = {good} neutral = {neutral} bad = {bad} />

    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {

  if(good> 0 || neutral > 0 || bad > 0){
   return(
    <div>
    <h2>Statistics:</h2>

    <table>
        <tbody>
          <Statistic text = {'Good'} number = {good} />
          <Statistic text = {'Neutral'} number = {neutral} />
          <Statistic text = {'Bad'} number = {bad} />

          <Statistic text = {'All'} number = {good + neutral + bad} />
          <Statistic text = {'Average'} number = {(good * 1 + neutral * 0 + bad * (-1))/3.0} />
          <Statistic text = {'Positive'} number = {(good/(good + neutral + bad))*100 + '%'} />
        </tbody>
    </table>
 </div>
  )
  }else{

    return (
      <div>
        <h2>Statistics:</h2>
        <p>No feedback given</p>
      </div>

    )
  }
}

const Statistic = ({text, number}) => {
    return(
        <tr>
          <td>{text}</td> 
          <td>{number}</td>
        </tr>
    )
}


const Button = ({text, handler}) => {

    return(
    <>
      <button onClick = {handler}>{text}</button>
    </>
    )
}



ReactDOM.render(<App />, 
  document.getElementById('root')
)