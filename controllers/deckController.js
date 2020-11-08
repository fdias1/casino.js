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
const cardDraw = (cardList,numberOfCards = 1,currentCard) => {
    if(numberOfCards<1 || !Number.isInteger(parseInt(numberOfCards))) numberOfCards = 1
    lastCard = parseInt(currentCard)+parseInt(numberOfCards)
    if (lastCard>52) throw 'Out of cards'
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
const convertToCardLabel = (cardId) => {
    const value = cardId%13
    const suit = parseInt(cardId/13)
    let card = ''
    switch(value) {
        case 0:
          card = 'A'
        break;
        case 9:
            card = 'T'
        break;
        case 10:
            card = 'J'
        break;
        case 11:
          card = 'Q'
        break;
        case 12:
            card = 'K'
        break;
        default:
          card = ''.concat(parseInt(value)+1)
    }

    switch(suit) {
        case 0:
          card = card.concat('c')
        break;
        case 1:
            card = card.concat('d')
        break;
        case 2:
            card = card.concat('h')
        break;
        case 3:
            card = card.concat('s')
        break;
    }
    return card

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
    try {
        const numberOfCards = req.query.cards
        const deckHash = req.query.deck
        const {cardList,currentCard} = getDeckFromHash(deckHash)
        const cards = cardDraw(cardList,numberOfCards,currentCard).map(id => convertToCardLabel(id))
        const newCurrentCard = parseInt(currentCard)+parseInt(numberOfCards)
        const newDeckHash = getDeckHash(cardList,newCurrentCard)
        const response = {
            cards,deckHash:newDeckHash
        }
        res.status(200).send({ok:true,message:null,payload:response})
    } catch(err) {
        res.status(400).send({ok:false,message:err})
    }
})

module.exports = router
