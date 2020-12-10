const express = require('express')
const router = express.Router()

router.use(express.json())
// register page
router.get('/register',(req,res,next) => {
    res.redirect('/public/register.html')
})

// API versions
const v1 = require('./v1')

// Router configuration
router.use('/v1',v1)


module.exports = router
