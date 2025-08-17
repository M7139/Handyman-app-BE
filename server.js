// imports
const express = require('express')
require('dotenv').config()
const session = require('express-session')
const path = require('path')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const AuthRouter = require('./routes/AuthRouter')
const requestRouter = require('./routes/requestRouter')
const reviewRouter = require('./routes/reviewRouter')
const providerRouter = require('./routes/providerRouter')

// Initialize app
const app = express()

// Database Configuration
const db = require('./db')

// set Port Configuration
const port = process.env.PORT ? process.env.PORT : 3000

// Require MiddleWares
const logger = require('morgan')

// Require passUserToView & isSignedIn middlewares

// use MiddleWares
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  res.header("Access-Control-Allow-Methods", "*")
  next()
})
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

// Root Route
app.get('/', (req, res) => {
  res.send('Your app is connected . . . ')
})

// use Routers
app.use('/auth', AuthRouter)
app.use('/user', userRouter)
app.use('/request', requestRouter)
app.use('/review', reviewRouter)
app.use('/provider', providerRouter)

// Listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
