import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Searchbar from './Components/Searchbar'
import Datawindow from './Components/Datawindow'


const App = () => {

  //Tilat
  const[countryData, setData] = useState([])
  const[shownData, setShown] = useState([])
  const[barText, setText] = useState('')
  
  //Datan haku internetista
  useEffect(
  () => {
   axios
  .get('https://restcountries.eu/rest/v2/all')
  .then(response => setData(response.data))
  }
  , [])
  
  //Tapahtumankäsittelijät
  
  const searchHandler = (event) => {

    setText(event.target.value)
    console.log(event.target.value)
    setShown(countryData.filter(country => country.name.slice(0, barText.length) === barText))

  }
  return(
    <>
     <p>Find countries: </p>
     <Searchbar currentState = {barText} changeHandler = {searchHandler}/>

     <Datawindow countrydata = {shownData}/>
     
    </>
  )


}



export default App;
