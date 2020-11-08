const express = require('express')
const router = express.Router()

const auth = require('./controllers/authController')
const dice = require('./controllers/diceController')
const coin = require('./controllers/coinController')

router.use(express.json())
router.use(auth)
router.use('/dice',dice)
router.use('/coin',coin)

module.exports = router
