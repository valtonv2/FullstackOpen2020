
const errorHandler = (err, req, res, next) => {

    console.log('Errorhandler works!')

    if(err.name === 'ValidationError') res.status(400).end()
    else next(err)

}

module.exports = {
    errorHandler: errorHandler
}