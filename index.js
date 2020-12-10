if(!process.env.NODE_ENV) require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/index')
const port = process.env.PORT

app.use(routes)

app.listen(port,() => console.log(`Server is running. Port: ${port}`))