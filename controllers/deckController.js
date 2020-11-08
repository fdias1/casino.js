const express = require('express')
const jwt = require('jsonwebtoken')
const secret = process.env.DECK_SECRET
const router = express.Router()

const shuffleCardList = () => {
    const shuffle = []
    for (let i=0;i<52;i++) {
        shuffle.push(Math.random())
    }
    const sort = shuffle.slice().sort()
    const cardList = sort.map(item => shuffle.indexOf(item))
    return cardList
}
const drawCards = (cardList,numberOfCards = 1,currentCard) => {
    lastCard = parseInt(currentCard)+parseInt(numberOfCards)
    const cards =  cardList.slice(currentCard,lastCard)
    return cards
}
const getDeckHash = (cardList,currentCard) => {
    const hash = jwt.sign({cardList,currentCard},secret)
    return hash
}
const getDeckFromHash = (deckHash) => {
    const deck = jwt.verify(deckHash,secret)
    return deck
}

router.get('/new',(req,res,next) => {
    try {
        const cardList = shuffleCardList()
        const deckHash = getDeckHash(cardList,0)
        res.status(200).send({ok:true,message:null,payload:{deckHash}})
    } catch(err) {
        res.status(400).send({ok:false,message:err})
    }
})
router.get('/draw', (req,res,next) => {
    const numberOfCards = req.query.cards
    const deckHash = req.query.deck
    const {cardList,currentCard} = getDeckFromHash(deckHash)
    const cards = drawCards(cardList,numberOfCards,currentCard)
    const newCurrentCard = parseInt(currentCard)+parseInt(numberOfCards)
    const newDeckHash = getDeckHash(cardList,newCurrentCard)
    const response = {
        cards,deckHash:newDeckHash
    }
    res.status(200).send({ok:true,message:null,payload:response})
})

module.exports = router