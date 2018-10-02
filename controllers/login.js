const shortid = require('shortid')
const Client = require('../models/Client')
const request = require('request')

exports.loginPage = (req, res) => {
    /* codificacion a base64 appID:secret
    Buffer.from("Hello World").toString('base64')*/
    res.render('login')
}

exports.bbvaToken = (req, res) => {
    request.post({
        url: 'https://connect.bbva.com/token?grant_type=authorization_code&redirect_uri='+'http://51.15.245.106:1234/login/bbva_token'+'&code='+req.query.code,
        headers: {
            'Authorization': 'Basic '+Buffer.from('app.bbva.travelexp:0izO7zEPNCnk9j%v3esvX1fXv*2v@55wLFyvFmBdaifnYdZAcnVzard*jFo$3eoT').toString('base64')
        },
        json: true
    },(error, response, body) => {
        const token = body.access_token
        request.get({
            url: 'https://apis.bbva.com/customers-sbx/v1/me-basic',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'jwt '+token
            },
            json: true
        }, (error, response, body) => {
            const userData = body.data
            const profile = new Client({
                uuid: userData.userId,
                name: userData.firstName,
                surname: userData.surname,
                gender: userData.sex,
                age: ((new Date()).getFullYear())-(new Date(userData.birthdate).getFullYear()),
                email: userData.email
            })
            profile.save(err => {
                if (err) {
                    console.log(err)
                }
                let nombre = await Client.findOne({
                    name: userData.name
                })
                res.render('login',{
                    uuid: nombre.name
                })
            })
        })
    })
}