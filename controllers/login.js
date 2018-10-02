const shortid = require('shortid')
const Client = require('../models/Client')
const bbva = require('')

exports.loginPage = (req, res) => {
    
    res.render('login',{
        test: 'test'
    })
}

exports.bbvaToken = (req, res) => {
    console.log(res.body)
}