module.exports = options => async (req,res,next) =>{
    const inflection = require('inflection')
    req.Model = require(`../models/${inflection.classify(req.params.resource)}`)
    next()
} 