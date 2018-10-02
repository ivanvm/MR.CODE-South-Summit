const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const transaccionSchema = new mongoose.Schema({
  uuid: {
    type: String,
    trim: true,
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  surname: {
    type: String,
    trim: true,
    required: true
  },
  gender: {
    type: String,
    trim: true,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  }
})

module.exports = mongoose.model('Client', transaccionSchema)
