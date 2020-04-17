
const errorHandler = (err, req, res, next) => {

    console.log('Errorhandler works!')
    console.error(err)


    if(err.name === 'ValidationError') res.status(400).json({error: err.message}).end()
    else next(err)

}

module.exports = {
    errorHandler: errorHandler
}