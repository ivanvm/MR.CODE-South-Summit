const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const transaccionSchema = new mongoose.Schema({
  id: {
    type: String,
    trim: true,
    required: true
  }
})

module.exports = mongoose.model('Client', transaccionSchema)
