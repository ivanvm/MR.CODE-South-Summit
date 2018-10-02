const shortid = require('shortid')
const Client = require('../models/Client')
const bbva = require('')

exports.loginPage = (req, res) => {
    /* codificacion a base64 appID:OAUTH
    Buffer.from("Hello World").toString('base64')*/

    res.render('login',{
        code: req.query.code
    })
}

exports.bbvaToken = (req, res) => {
    console.log(res.body)
}