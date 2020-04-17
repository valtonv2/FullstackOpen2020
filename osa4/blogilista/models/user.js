const mongoose = require('mongoose')
const uniqueValid = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    userName: {type: String, unique: true, required: true, minlength: 3},
    name: {type: String, required: true, minlength: 3},
    passwordHash: {type:String, required: true},
    blogs: [{type:mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
})

userSchema.plugin(uniqueValid)

userSchema.set('toJSON', {
    
    transform: (doc, ret) => {

        ret.id = ret._id.toString()
        delete ret._id
        delete ret._v
        delete ret.passwordHash

    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}