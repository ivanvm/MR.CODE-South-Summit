const Client = require('../models/Client')
const request = require('request')
const rp = require('request-promise');

exports.welcome = (req, res) => {
    req.cookies.uuid
    res.render('welcome')
}

exports.destination = (req, res) => {
    res.render('destination')
}

exports.bookingdate = (req, res) => {
    res.render('bookingdate')
}

exports.returndate = (req, res) => {
    res.render('returndate')
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

    var travelopt = 0

    var api_url_flights = '', api_url_hotels = 'https://test.api.amadeus.com/v1/shopping/hotel-offers'
    switch (travelopt) {
        case 0:
            api_url_flights = 'https://test.api.amadeus.com/v1/shopping/flight-offers?origin=' + 'MAD' + '&destination=' + 'BCN' + '&departureDate=' + '2018-11-25' + '&returnDate=' + '2018-11-28&nonStop=true&max=1'
            break;
        case 1:
            api_url_flights = 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=' + 'MAD' + '&maxPrice=' + '400'
            break;
        case 2:
            api_url_flights = 'https://test.api.amadeus.com/v1/shopping/flight-dates?origin=' + 'PAR' + '&destination=' + 'LON'
            break;
        default:
            api_url_flights = ''
    }

    /********************GET ACCESS TOKEN***************/
    var tripDestinations = [], hotelDestinations = [], hotelAvgPrice = 60
    var access_token = ''

    var getToken = {
        method: 'POST',
        uri: 'https://test.api.amadeus.com/v1/security/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'client_id=N1ZQD3gBzEr303NKC5pRyDv0lMCVGkG8&client_secret=EG6AUAl0jsw30xjd&grant_type=client_credentials',
        json: true
    };

    var getHotels = {
        uri: api_url_hotels,
        qs: {
           cityCode: 'LON',
           checkInDate: '2018-11-25',
           checkOutDate: '2018-11-28' // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        headers: {
            'Authorization': 'Bearer '
        },
        json: true // Automatically parses the JSON string in the response
    };

    var getFlights = {
        uri: api_url_flights,
        qs: {
             // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        headers: {
            'Authorization': 'Bearer '
        },
        json: true // Automatically parses the JSON string in the response
    };




    rp(getToken)
        .then(function (body) {
            // POST succeeded...
            access_token = body.access_token
            res.send(getHotels.headers+=access_token)
          /*  getFlights.headers+=access_token

            -

            rp(getHotels)
                .then(function (body) {
                  console.log('Getting hotels information...')
                    const hotelData = body.data

                    hotelAvgPrice = hotelData[0]['offers'][0].price.total

                    var i = 0

                    while (i<10 && i<hotelData.length)  {


                       hotelDestinations.push({
                          price:hotelData[i]['offers'][0].price.total
                        })

                      i++;
                    }


                    rp(getFlights)
                        .then(function (body) {
                            const tripData = body.data


                            var i = 0

                            while (i<10 && i<tripData.length)  {

                              if (travelopt == 0) {
                /*******************************************FALTA ACCEDER A TODAS LAS PROPERTIES**************************************
                                tripDestinations.push({
                                  origin:tripData[i]['offerItems'][0]['services'][0]['segments'][0]['flightSegment'].departure.iataCode,
                                  destination:tripData[i]['offerItems'][0]['services'][0]['segments'][0]['flightSegment'].arrival.iataCode,
                                  departureDate:tripData[i]['offerItems'][0]['services'][0]['segments'][0]['flightSegment'].departure.at,
                                  returnDate:Date.parse(tripData[i]['offerItems'][0]['services'][0]['segments'][0]['flightSegment'].arrival.at),
                                  price:parseFloat(tripData[i]['offerItems'][0].price.total) + parseFloat(hotelAvgPrice)
                                })
                              } else if (travelopt == 1) {
                                tripDestinations.push({
                                  origin:tripData[i].origin,
                                  destination:tripData[i].destination,
                                  departureDate:tripData[i].departureDate,
                                  returnDate:tripData[i].returnDate,
                                  price:parseFloat(tripData[i].price.total) + parseFloat(hotelAvgPrice)
                                })

                              }
                              i++;
                            }



                            res.render('results', {
                                tripDestinations: tripDestinations,
                                hotelDestinations: hotelDestinations,
                                hotelAvgPrice: hotelAvgPrice
                            })
                        })
                        .catch(function (err) {
                            // API call failed...
                            console.log('Error getting flights info. . Access_token: ' + access_token)
                            console.log(err)
                        });
          /*      })
                .catch(function (err) {
                    // API call failed...
                    console.log('Error getting hotels info. Access_token: ' + access_token)
                    console.log(err)
                }); */
        })
        .catch(function (err) {
            // POST failed...
            console.log('Error getting access_token');
        });


}

exports.dbInterests = (req, res) => {
    Client.findOneAndUpdate({ uuid: '23f99f449523abe2418775c87f044cb8123da3d1fcb81623b1a39bc2da9c7939' }, { interests: req.body.data }, err => {
        if (err) {
            console.log(err)
        }
        res.redirect('/date')
    })
}
