
const errorHandler = (err, req, res, next) => {

    console.log('Errorhandler works!')
    console.error(err)


    if(err.name === 'ValidationError') res.status(400).json({error: err.message}).end()
    else if(err.name === 'JsonWebTokenError') res.status(401).json({error: 'Invalid token'}).end()
    else next(err)

}

const tokenExtractor = (req, res, next) => {

    const possibleToken = req.get('Authorization')
    console.log('Recieved authorization: ', possibleToken)
    if(possibleToken && possibleToken.toLowerCase().startsWith('bearer')){
        req.token = possibleToken.substring(7)
    }

    next()
}

module.exports = {
    errorHandler: errorHandler, 
    tokenExtractor: tokenExtractor
}