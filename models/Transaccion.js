const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const transaccionSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: true
  },
  offer: {
    type: String,
    trim: true,
    required: true
  },
  tcod: {
    type: String,
    trim: true,
    required: true
  },
  ip: {
    type: String,
    trim: true,
    required: true
  },
  location: {
    type: String,
    trim: true,
    required: true
  },
  date: new Date(),
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  }
})

module.exports = mongoose.model('Transaccion', transaccionSchema)
