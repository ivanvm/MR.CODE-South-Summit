const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const visitorSchema = new mongoose.Schema({
  product_id: {
    type: String,
    trim: true,
    required: true
  },
  product_offer: {
    type: String,
    trim: true,
    required: true
  },
  tcod: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  ip: {
    type: String,
    trim: true,
    required: true
  },
  country_code: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: (() => new Date())
  }
})

module.exports = mongoose.model('Visitor', visitorSchema)
