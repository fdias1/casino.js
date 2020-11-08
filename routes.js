const express = require('express')
const router = express.Router()

const auth = require('./controllers/authController')
const dice = require('./controllers/diceController')
const coin = require('./controllers/coinController')
const roulette = require('./controllers/rouletteController')

router.use(express.json())
router.use(auth)
router.use('/dice',dice)
router.use('/coin',coin)
router.use('/roulette',roulette)

module.exports = router
