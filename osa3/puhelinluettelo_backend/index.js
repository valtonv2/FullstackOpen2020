require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')
const app = express()

app.use(express.static('build'))

app.use(bodyParser.json())

morgan.token('postData', (req, res) => {

  return(JSON.stringify(req.body))

})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))


app.use(cors())




app.get('/api/persons', (request, response) => {

  Person.find({}).then(people => {response.json(people.map(m => m.toJSON()))})
})

app.get('/info', (request, response) => {
   
  Person.find({}).then(people => {
     
    response.writeHead(200)
    response.end(`Phonebook has info for ${people.length} people. `)


  })
    
})

app.get('/api/persons/:id', (req, res, next) => {

  const wantedId = Number(req.params.id)
    
  Person.findById(wantedId)
    .then(person => {
      if(person){
        res.json(person.toJSON())
      }else{
        res.status(404).end()
      }
    })
    .catch(error => next(error))
    
})
     
app.delete('/api/persons/:id', (req, res, next) => {

  const id = req.params.id

  console.log('DeleteID: ', id)

  Person.findByIdAndDelete(id).then( result => {

    res.status(204).end()

  }).catch(error => next(error))

    
})


app.post('/api/persons', (req, res, next) => {

  const person = req.body

  if(!person.name || !person.number){

    return res.status(400).json({error:'Person data missing'})

  }

  const newEntry = new Person({
    name: person.name,
    number: person.number
  })

  newEntry.save().then(saved => {

    res.json(saved.toJSON())
  }).catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {

  const id = req.params.id

  const person = req.body

  Person.findByIdAndUpdate(id, person, {new:true}).then(updated => {

      
    res.json(updated.toJSON()).end()

  }).catch(error => next(error))


})

app.use(function (err, req, res, next) {

  console.log('Virhe Vastaanotettu: ', err.name)
  console.error(err.message)
  console.log('Virheidenkäsittelijä kutsuttu')
    
  if(err.name === 'CastError' && err.kind == 'ObjectId'){
    return res.status(400).send({error:'malformatted id'})
  }else if(err.name === 'ValidationError'){
    console.log('Ollaan oikeassa if haarassa')
    return res.status(400).json({error:err.message})
  }
  console.log('Siirretään defaulttivirheenkäsittelijälle')
  next(err)
    
})
  
  


const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`))