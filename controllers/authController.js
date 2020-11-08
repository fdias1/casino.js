const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router()
const secret = process.env.JWT_SECRET

const register = async (req,res,next) => {
    try {
        const emailRegExp = /^\w+@\w+$/
        if(req.body.email && emailRegExp.test(req.body.email)) {
            const token = await jwt.sign({email:req.body.email},secret)
            res.status(400).send({ok:true,message:null,payload:{token}})
        } else {
            res.status(400).send({ok:false,message:'Invalid email'})
        }
    } catch(err) {
        res.status(400).send({ok:false,message:err})
    }
}
const auth = async (req,res,next) => {
    try {
        if (req.headers.token && jwt.verify(req.headers.token,secret)) {
            next()
        } else {
            res.status(401).send({ok:false,message:'Unauthorized'})
        }
    } catch(err) {
        res.status(400).send({ok:false,message:err})
    }
}
const deserializeUser = async (req,res,next) => {
    try {
        const token = req.headers.token
        const user = jwt.verify(token,secret)
        req.user = user
        next()
    } catch(err) {
        res.status(400).send({ok:false,message:err})
    }
}

router.post('/register',register)
router.use(auth,deserializeUser)

module.exports = router