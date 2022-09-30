const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

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

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
	
	const { title, author, url, likes } = request.body

	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!decodedToken.id) { 
		return response.status(401).json({
			error: 'token invalid or missing'
		})
	}

	//const user = await User.findById( decodedToken.id )

	const newBlog = new Blog({
		title,
		author,
		url,
		likes: likes || 0,
		user: request.user._id
	})

	request.user.blogs = request.user.blogs.concat(newBlog._id)
	await request.user.save()

	const savedNote = await newBlog.save()
	response.status(201).json(savedNote)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	const blogToDelete = await Blog.findById(request.params.id)

	if ( blogToDelete.user.toString() !== decodedToken.id ) {
		return response.status(401).json({
			error: 'user do not have permission to delete this blog'
		})
	} 
	
	request.user.blogs = request.user.blogs.filter( objectId => objectId.toString() !== blogToDelete._id.toString())
	request.user.save()
	
	await blogToDelete.remove()
	response.status(204).end()

})

blogRouter.put('/:id', async (request, response) => {

	const body = request.body
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	const blogToUpdate = await Blog.findById(request.params.id)

	if ( blogToUpdate.user.toString() !== decodedToken.id ) {
		return response.status(401).json({
			error: 'user do not have permission to update this blog'
		})
	} 
	
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
