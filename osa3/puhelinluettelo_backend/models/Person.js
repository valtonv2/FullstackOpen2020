const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const databaseUrl = process.env.MONGODB_URI

mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(databaseUrl, {useNewUrlParser:true}).then(result => console.log('Connected to mongoDB')).catch(error => {console.log("Failed to connect to database", error.message)})

const personschema = new mongoose.Schema({
  name:{
    type:String,
    minlength:3,
    required:true,
    unique:true
  },
  number:{
    type:String,
    minlength:8,
    required:true,
    unique:true
  }
})

personschema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personschema)

personschema.set('toJSON', {

  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret._v
  }

})

module.exports = Person