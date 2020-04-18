const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')


//Creation of new user
userRouter.post('/', async (request, response) => {

    const body = request.body

    if(body. password && body.password.length >= 3) {

        const cryptedPassword = await bcrypt.hash(body.password, 10)

        const newUser = new User.User({
            userName: body.userName,
            passwordHash: cryptedPassword,
            name: body.name
        })

        const saveResult = await newUser.save()
        response.status(201).json(saveResult.toJSON()).end()

    }else{
        response.status(400).json({error: 'Password too short!'}).end()
    }
    

})

//Getting users
userRouter.get('/', async (request, response) => {

    const allUsers = await User.User.find({}).populate('blogs', {url: 1, title: 1, author: 1, _id: 1})
    if(allUsers) response.status(201).json(allUsers.map( user => user.toJSON()))
    else response.status(404).end()

})

module.exports = userRouter