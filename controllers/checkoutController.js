const Visitor = require('../models/Visitor')
const shortid = require('shortid')
const iplocation = require('iplocation')
const countriesList = require('../node_modules/countries-list/dist/data.json')

exports.checkoutPage = async (req, res) => {
  let newConnection = new Visitor({
    tcod: req.query.tcod != undefined && req.query.tcod != '' ? req.query.tcod : shortid.generate(),
    product_id: req.params.product_id,
    product_offer: req.query.off,
    ip: req.headers['x-forwarded-for'] || req.ip,
    country_code: 'ES'
  })
  await newConnection.save((err, newConnection) => {
    if (err) {
      Visitor.find({tcod: req.query.tcod}).then(res => {
        Visitor.updateOne({tcod: req.query.tcod},
          {
            ip: req.headers['x-forwarded-for'] || req.ip,
            date: new Date()
          },
          (err,res) => {
            if (err) console.log(err)
          })
      })
    }
  })
  res.render('checkout',{
    tcod: newConnection.tcod,
    product_id: newConnection.product_id,
    product_offer: newConnection.product_offer,
    locationObject: {
      country_code: newConnection.country_code,
      properties: countriesList.countries[newConnection.country_code]
    },
    countriesList: countriesList.countries
  })
}
