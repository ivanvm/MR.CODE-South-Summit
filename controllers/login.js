const shortid = require('shortid')
const Client = require('../models/Client')

exports.loginPage = (req, res) => {
    /* codificacion a base64 appID:OAUTH
    Buffer.from("Hello World").toString('base64')*/
    res.render('login')
}

exports.bbvaToken = (req, res) => {
    res.render('login',{
        code: req.query.code
    })
}