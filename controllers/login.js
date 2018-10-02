const Client = require('../models/Client')
const request = require('request')
const client_id = 'app.bbva.travelexp',
    redirect_uri = 'http://51.15.245.106:1234/login/bbva_token',
    secret_id = '0izO7zEPNCnk9j%v3esvX1fXv*2v@55wLFyvFmBdaifnYdZAcnVzard*jFo$3eoT'

exports.loginPage = (req, res) => {
    res.render('login')
}

exports.bbvaToken = (req, res) => {
    request.post({
        url: 'https://connect.bbva.com/token?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&code=' + req.query.code + '&grant_type=authorization_code',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + secret_id).toString('base64')
        },
        json: true
    }, (error, response, body) => {
        request.get({
            url: 'https://apis.bbva.com/customers-sbx/v1/me-basic',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'jwt ' + body.access_token
            },
            json: true
        }, (error, response, body) => {
            const userData = body.data
            const profile = new Client({
                uuid: userData.userId,
                name: userData.firstName,
                surname: userData.surname,
                gender: userData.sex,
                age: ((new Date()).getFullYear()) - (new Date(userData.birthdate).getFullYear()),
                email: userData.email
            })
            profile.save(async(err) => {
                if (err) {
                    console.log(err)
                }
                res.render('login', {
                    userData: userData
                })
            })
        })
    })
}