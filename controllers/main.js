const Client = require('../models/Client')
const request = require('request-promise')

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


  let userTripData = 'origin=MAD&destination=BCN&departureDate=2018-11-25&maxPrice=400'


  const tripDestinations = []
  let access_token = '', hotelAvgPrice = 60, knownDestination = 1, api_url_flights = ''

    switch (knownDestination) {
        case 0:
            api_url_flights = 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=' + 'MAD'  + '&maxPrice=' + '400'
            break;
        case 1:
            api_url_flights = 'https://test.api.amadeus.com/v1/shopping/flight-offers?nonStop=true&max=1&'
            api_url_flights += userTripData
            break;
    }



    const getToken = {
        method: 'POST',
        uri: 'https://test.api.amadeus.com/v1/security/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'client_id=N1ZQD3gBzEr303NKC5pRyDv0lMCVGkG8&client_secret=EG6AUAl0jsw30xjd&grant_type=client_credentials',
        json: true
    };

    const getFlights = {
        uri: api_url_flights,
        qs: {

        },
        headers: {
            'Authorization': 'Bearer '
        },
        json: true
    };


    /*GET ACCESS TOKEN*/

    request(getToken)
        .then(function (body) {

            access_token = body.access_token
            getFlights.headers.Authorization+=access_token


              /*GET FLIGHS INFO*/
              request(getFlights)
                  .then(function (body) {
                      const tripData = body.data


                      var i = 0

                      while (i<10 && i<tripData.length)  {

                      if (knownDestination == 0) {
                        tripDestinations.push({
                          origin:tripData[i].origin,
                          destination:tripData[i].destination,
                          departureDate:tripData[i].departureDate,
                          returnDate:tripData[i].returnDate,
                          price:parseFloat(tripData[i].price.total) + parseFloat(hotelAvgPrice)
                        })

                        }
                        else if (knownDestination == 1) {
                          tripDestinations.push({
                            origin:tripData[i]['offerItems'][0]['services'][0]['segments'][0]['flightSegment'].departure.iataCode,
                            destination:tripData[i]['offerItems'][0]['services'][0]['segments'][0]['flightSegment'].arrival.iataCode,
                            departureDate:tripData[i]['offerItems'][0]['services'][0]['segments'][0]['flightSegment'].departure.at,
                            returnDate:tripData[i]['offerItems'][0]['services'][0]['segments'][0]['flightSegment'].arrival.at,
                            price:parseFloat(tripData[i]['offerItems'][0].price.total) + parseFloat(hotelAvgPrice)
                          })

                        }

                        i++;

                    }


                      /*RENDER RESULTS*/
                      res.render('results', {
                          tripDestinations: tripDestinations,
                          hotelAvgPrice: hotelAvgPrice
                      })
                  })
                  .catch(function (err) {

                      console.log('Error getting flights info. . Access_token: ' + access_token)
                      console.log(err)
                  });

        })
        .catch(function (err) {

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
