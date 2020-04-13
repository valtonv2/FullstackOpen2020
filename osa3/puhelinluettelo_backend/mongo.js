const mongoose = require('mongoose')

if(process.argv.length < 3) {

    console.log("Password missing")
    process.exit(1)

}

const password = process.argv[2]

const databaseUrl = `mongodb+srv://Phonebookuser:${password}@cluster0-mwou7.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(databaseUrl, {useNewUrlParser:true})


//Puhelinnumeron lisäys kantaan

const personschema = new mongoose.Schema({
    name:String,
    number:Number
})

const Person = mongoose.model('Person', personschema)

if(process.argv.length < 5) console.log('Not enough arguments to add a person')
else{

    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    newPerson.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
        process.exit(1)
    })
   
}

Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})
