const express = require('express')
const router = express.Router()
const checkoutController = require('../controllers/checkoutController')

router.get('/:product_id',checkoutController.checkoutPage)

module.exports = router
