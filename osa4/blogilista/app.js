const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleWare = require('./utils/middleware')



console.log('Trying to connect to MongoDB with URI ' , config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((error) => console.log("Error connecting to DB: ", error.message))

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(middleWare.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test'){
    const testRouter = require('./controllers/testing')
    app.use('/api/testing', testRouter)
}

app.use(middleWare.errorHandler)


module.exports = app
