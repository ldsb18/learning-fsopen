const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
	const authorization = request.get('authorization')

	if( authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {username: 1})
	response.json(blogs)
})

blogRouter.get('/:id', async (request, response, ) => {
	
	const blog = await Blog.findById(request.params.id)

	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

blogRouter.post('/', async (request, response) => {
	
	const { title, author, url, likes } = request.body

	const token = getTokenFrom(request)
	const decodedToken = jwt.verify(token, process.env.SECRET)

	if (!decodedToken.id) { 
		return response.status(401).json({
			error: 'token invalid or missing'
		})
	}

	const user = await User.findById( decodedToken.id )

	const newBlog = new Blog({
		title,
		author,
		url,
		likes: likes || 0,
		user: user._id
	})

	user.blogs = user.blogs.concat(newBlog._id)
	await user.save()

	const savedNote = await newBlog.save()
	response.status(201).json(savedNote)
})

blogRouter.delete('/:id', async (request, response) => {
	
	await Blog.findByIdAndDelete(request.params.id)

	response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {

	const body = request.body

	const updatedData = {
		title: body.title || null,
		author: body.author || null,
		url: body.url || null,
		likes: body.likes || null
	}
	
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id, 
		updatedData, 
		{ new: true, runValidators: true, context: 'query' })

	response.json(updatedBlog)
})

module.exports = blogRouter
