const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const Bundler = require('parcel-bundler')
const routes = require(path.join(__dirname, 'routes'))

const app = express()
const config = require('./parcel.config.js')
const bundler = new Bundler(config.file, config.options)

app.set('trust proxy', true)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

mongoose.connect('mongodb://@ds219983.mlab.com:19983/bbva-travel-experience', {
    useNewUrlParser: true,
    auth: {
        user: 'admin',
        password: 'admin123'
    }
})
mongoose.connection.on('error', console.error.bind('console', 'Error de conexión: '))

app.use(cors({ credentials: true, origin: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/public', express.static('public'))
app.use(bundler.middleware())
app.use(routes)

app.listen(1234)