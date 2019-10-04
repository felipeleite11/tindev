require('dotenv').config()
const express = require('express')
const server = express()
const routes = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')

//Mongo DB connection
mongoose.connect(process.env.MONGO_CONN_STR, { useNewUrlParser: true })
mongoose.connection.once('open', () => console.log('Conexão MongoDB bem sucedida!'))

//Middlewares
server.use(express.json())
server.use(cors())
server.use(routes)

server.listen(3333)