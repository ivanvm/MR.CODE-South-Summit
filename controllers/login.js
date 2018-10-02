const shortid = require('shortid')
const Client = require('../models/Client')

exports.loginPage = (req, res) => {
    /* codificacion a base64 appID:OAUTH
    Buffer.from("Hello World").toString('base64')*/
    res.render('login')
}

exports.bbvaToken = (req, res) => {
    res.redirect('https://connect.bbva.com/token?grant_type=authorization_code&redirect_uri='+'http://51.15.245.106:1234/login/bbva_token'+'&code='+req.query.code)
}