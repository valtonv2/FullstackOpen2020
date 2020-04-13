import React, { useState, useEffect } from 'react'
import Personform from './Components/Personform'
import Filterform from './Components/Filterform'
import Listofpeople from './Components/Listofpeople'
import serverComm from './services/Persons'
import Notification from './Components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 

  useEffect(() => {

    serverComm.getAllData().then(data => setPersons(data))
    

  }, [])

  const [ newName, setNewName ] = useState('')

  const [newNum, setNewNum] = useState('')

  const [filterLetters, setFilterLetters] = useState('')

  const [announcement, setAnnouncement] = useState(null)

  const [isError, setError] = useState(false)


//Tapahtumankäsittelijäetodi joka lisää henkilölistaan uuden ihmisen
  const addNewPerson = (event) => {
    
    event.preventDefault()

    if(newName && newNum && !persons.map(person => person.name).includes(newName)){
    const newObj ={
     name: newName,
     number: newNum
    }

    serverComm.postNewData(newObj).then(newPerson => {
      setPersons(persons.concat(newPerson))
      console.log('Person added is ', newPerson.name )
      setAnnouncement(`Added ${newObj.name}`)

      setTimeout(() => {setAnnouncement(null)}, 3000)
    }).catch(error => {
      console.log("Error recieved.", error.response.data.error)
      setError(true)
      setAnnouncement(error.response.data.error)
      setTimeout(() => {setAnnouncement(null)}, 3000)
      setTimeout(() => {setError(false)}, 3000)

    })
   
    }else{

      if(newName && newNum && window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number with a new one?`)){
        
        const oldObj = persons.find(person => person.name === newName)
        const newObj = {...oldObj, number:newNum}
        serverComm.updateData(oldObj.id, newObj).then(updatedPerson => {
          console.log(`Updated: ${updatedPerson.name} ${updatedPerson.number}`)
          setPersons(persons.map(person =>  person.id !== oldObj.id ? person:updatedPerson))
        
          setAnnouncement(`Changed number of ${updatedPerson.name}`)
          setTimeout(() => {setAnnouncement(null)}, 3000)
        
        }).catch(error => {
          
          setError(true)
          setAnnouncement(`Person was already deleted from the phonebook.`)
          setTimeout(() => {setAnnouncement(null)}, 3000)
          setTimeout(() => {setError(false)}, 3000)


          setPersons(persons.filter(person => person.id !== newObj.id))
          
        })

      }else{

        console.log("Add cancelled")

      }

    }
      
  }
 
  //Henkilöiden poisto
  const deletePerson = (id) => {

    const targetPerson = persons.find(person => person.id === id)

    if(window.confirm(`Do you really want to delete ${targetPerson.name} `)){

    serverComm.deleteData(id).then(response => console.log('Deletion successful'))
    setPersons(persons.filter(human => human.id !== id))

    setAnnouncement(`Deleted ${targetPerson.name}`)
    setTimeout(() => {setAnnouncement(null)}, 3000)

    }else{console.log("Deletion cancelled")}

  }


  /*Metodi joka hoitaa newname-tilan päivityksen kenttään
  kirjoitettaessa.
*/
  const handleNameWrite = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberWrite = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterLetters(event.target.value)

    console.log(filterLetters)

  }
  
  //Metodi joka vastaa ihmisten filtteröinnistä
  const filteredPeople = () => {

    const list = []

    persons.forEach(person => {
      if(person && person.name.slice(0, filterLetters.length) === filterLetters){
      list.push(person)
      }
  })
  return list
  }
 
 
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message = {announcement} isError = {isError} />

      <Filterform 
      filterLetters = {filterLetters} 
      changeHandler = {handleFilter}
      />


      <Personform 
      addFunction = {addNewPerson} 
      currentName = {newName} 
      nameChangeHandler = {handleNameWrite} 
      currentNum = {newNum} 
      numChangeHandler = {handleNumberWrite} 
      />

  
      <h2>Numbers</h2>
      <Listofpeople list = {filteredPeople()} deleteFunction = {deletePerson} />
       
      
    </div>
  )

  

}






export default App