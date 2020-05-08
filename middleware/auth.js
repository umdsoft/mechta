const jwt = require('jsonwebtoken')
const config = require('../config/server')

module.exports = function (req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.splint(' ')[1];

    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, config.secret)
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }

    req.userId = payload.subject;
    next();
}