const log = 

((req, res, next) => {
    console.log(req.method)
    console.log(req.path)
    console.log(req.body)
    console.log('-------------')
    next() /*Middelware pasa a las siguientes peticiones*/
})

module.exports = log