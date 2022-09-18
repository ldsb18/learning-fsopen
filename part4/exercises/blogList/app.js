const config = require('./utils/config')

const express = require('express')
const app = express()
const cors = require('cors')

const blogRouter = require ('./controllers/blogs')

const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const mongoose = require('mongoose')

logger.info(`Connecting to: `, config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)  
	.then( result => {
		logger.info(`Connected to MongoDB`);
	})
	.catch( err => {
		logger.error(`Failed to connect to MongoDB`, err.message)
	})


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

//Middleware for loggin on console all requests
app.use(middleware.requestLogger)

//The app router, handle request for route 'api/blogs'
app.use('/api/blogs', blogRouter)

//Middleware for handling bad URLs GET and handling error, respectively
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app