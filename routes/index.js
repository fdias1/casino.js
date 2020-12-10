const express = require('express')
const router = express.Router()

router.use(express.json())

// API versions
const v1 = require('./v1')

// Router configuration
router.use('/v1',v1)


module.exports = router
