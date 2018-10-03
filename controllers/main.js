const Client = require('../models/Client')

exports.welcome = (req, res) => {
    req.cookies.uuid
    res.render('welcome')
}

exports.destination = (req, res) => {
    res.render('destination')
}

exports.date = (req, res) => {
    res.render('date')
}

exports.budget = (req, res) => {
    res.render('budget')
}

exports.details = (req, res) => {
    res.render('details')
}

exports.interests = (req, res) => {
    res.render('interests')
}

exports.results = (req, res) => {

    const request = require('request')
    const client_id = 'N1ZQD3gBzEr303NKC5pRyDv0lMCVGkG8',
        client_secret = 'EG6AUAl0jsw30xjd',
        travelopt = 2
    var api_url = ''
    switch (travelopt) {
        case 0:
            api_url = 'https://test.api.amadeus.com/v1/shopping/flight-offers?origin=' + 'PAR' + '&destination=' + 'LON' + '&departureDate=' + '2018-10-25' + '&returnDate=' + '2018-10-28'
            break;
        case 1:
            api_url = 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=' + 'LON' + '&maxPrice=' + '400'
            break;
        case 2:
            api_url = 'https://test.api.amadeus.com/v1/shopping/flight-dates?origin=' + 'PAR' + '&destination=' + 'LON'
            break;
        default:
            api_url = ''
    }

    request.post({
        url: 'https://test.api.amadeus.com/v1/security/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'client_id=N1ZQD3gBzEr303NKC5pRyDv0lMCVGkG8&client_secret=EG6AUAl0jsw30xjd&grant_type=client_credentials',
        json: true
    }, (error, response, body) => {

        request.get({
            url: api_url,
            headers: {
                'Authorization': 'Bearer ' + body.access_token
            },
            json: true
        }, (error, response, body) => {
            const userData = body.data

            res.render('results', {
                userData: userData
            })
        })
    })

}

exports.dbInterests = (req, res) => {
    Client.findOneAndUpdate({ uuid: '23f99f449523abe2418775c87f044cb8123da3d1fcb81623b1a39bc2da9c7939' }, { interests: req.body.data }, err => {
        if (err) {
            console.log(err)
        }
        res.redirect('/date')
    })
}