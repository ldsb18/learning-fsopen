const config = require('./utils/config')

const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const blogRouter = require ('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const mongoose = require('mongoose')

logger.info('Connecting to: ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)  
	.then( result => {
		logger.info('Connected to MongoDB')
	})
	.catch( err => {
		logger.error('Failed to connect to MongoDB', err.message)
	})


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

//Middleware for loggin on console all requests
app.use(middleware.requestLogger)
//Middleware for extract token and insert it in request object
app.use(middleware.tokenExtractor)

//The app router, handle request for route 'api/blogs'
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

//Middleware for handling bad URLs GET and handling error, respectively
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app