const express = require('express')
const router = express.Router()

const roulette = (type = 'french') => {
    let positions
    if(type == 'american') {
        positions = 38
    } else {
        positions = 37
        type = 'french'
    }

    const number = Math.floor(Math.random() * positions)
    const value = number === 37 ? '00' : ''.concat(number)

    return {type,value}
}
const rouletteResults = ({value,type}) => {
    const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
    const odd = value%2 === 1
    const even = value%2 === 0 && value > 0
    const firstDozen = value > 0 && value <= 12
    const secondDozen = value > 12 && value <= 24
    const thirdDozen = value > 24 && value <= 36
    const red = redNumbers.indexOf(value) != -1
    const black = redNumbers.indexOf(value) == -1 && value !=0
    const firstHalf = value > 0 && value <= 18
    const secondHalf = value > 18 && value <= 36
    
    return({type,value,odd,even,firstDozen,secondDozen,thirdDozen,red,black,firstHalf,secondHalf})
}

router.get('/',async (req,res) => {
    try {
        const response = rouletteResults(roulette(req.query.type))
        res.status(200).send({ok:true,payload:response, messagem:null})
    } catch(err) {
        res.status(400).send({ok:false,message:err})
    }
})
module.exports = router