const shortid = require('shortid')
const Client = require('../models/Client')
const request = require('request')

exports.loginPage = (req, res) => {
    /* codificacion a base64 appID:OAUTH
    Buffer.from("Hello World").toString('base64')*/
    res.render('login')
}

exports.bbvaToken = (req, res) => {
    request.post({
        url: 'https://connect.bbva.com/token?grant_type=authorization_code&redirect_uri='+'http://51.15.245.106:1234/login/bbva_token'+'&code='+req.query.code
    },(error, response, body) => {
        res.render('login',{
            code: response.body.access_token
        })
    })
}