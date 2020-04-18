const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {

    const body = req.body
    const user = await User.User.findOne({userName: body.userName})

    console.log(user)

    const passwordOk = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
    if(!user || !passwordOk) return(res.status(401).json({error: 'invalid username or password'}))

    const tokenUser = {userName: user.userName, id: user._id}
    const token = jwt.sign(tokenUser, process.env.SECRET)

    res.status(200).json({token, userName: user.userName, name: user.name})

})






module.exports = loginRouter