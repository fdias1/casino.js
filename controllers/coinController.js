const express = require('express')
const router = express.Router()

const coinFlip = (numberOfCoins) => {
    if (numberOfCoins > 1000) throw 'Too many coins!'
    
    const result = []
    for (let i=0;i<numberOfCoins;i++) {
        const value = Math.floor(Math.random() * 2)
        if (value == 0) {
            result.push('Heads')
        } else {
            result.push('Tails')
        }
    }
    return result
}

router.get('/',async (req,res) => {
    try {
        const coins = Math.floor(req.query.coins) || 1
        const result = coinFlip(coins)
        const response = {
            coins,result
        }
        res.status(200).send({ok:true,payload:response, messagem:null})
    } catch(err) {
        res.status(400).send({ok:false,message:err})
    }
})
module.exports = router