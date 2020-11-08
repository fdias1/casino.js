const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router()
const secret = process.env.JWT_SECRET

router.post('/register',async (req,res,next) => {
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
})

router.use(
    async (req,res,next) => {
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
)

module.exports = router