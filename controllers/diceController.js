const express = require('express')
const router = express.Router()

const rollDice = (numberOfFaces,numberOfDice) => {
    if (numberOfFaces > 1000) throw 'Too many faces!'
    if (numberOfDice > 1000) throw 'Too many dice!'

    const result = []
    for (let i=0;i<numberOfDice;i++) {
        const value = Math.ceil(Math.random() * numberOfFaces)
        result.push(value)
    }
    return result
}

router.get('/',async (req,res) => {
    try {
        const faces = Math.floor(req.query.faces) || 6
        const dice = Math.floor(req.query.dice) || 1
        const result = rollDice(faces,dice)
        const response = {
            dice,faces,result
        }
        res.status(200).send({ok:true,payload:response, messagem:null})
    } catch(err) {
        res.status(400).send({ok:false,message:err})
    }
})
module.exports = router