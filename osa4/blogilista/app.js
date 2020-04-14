const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')
const middleWare = require('./utils/middleware')



console.log('Trying to connect to MongoDB with URI ' , config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch((error) => console.log("Error connecting to DB: ", error.message))

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use('/api/blogs', blogRouter)
app.use(middleWare.errorHandler)

module.exports = app
