const express = require('express')
const router = express.Router()
const login = require('../controllers/login')
const main = require('../controllers/main')

router.get('/login', login.loginPage)
router.get('/login/bbva_token', login.bbvaToken)
router.get('/welcome', main.welcome)
router.get('/destination', main.destination)
router.get('/interests', main.interests)
router.get('/date', main.date)
router.get('/budget', main.budget)
router.get('/results', main.results)
router.get('/details', main.details)
router.post('/dbcontroller/interests', main.dbInterests)


module.exports = router