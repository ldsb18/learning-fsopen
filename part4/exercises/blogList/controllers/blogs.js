const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {

	const blogs = await Blog.find({})

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

blogRouter.post('/', (request, response, next) => {
	
	const body = request.body

	const newBlog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	})
	
	newBlog.save()
		.then( savedNote => {
			response.status(201).json(savedNote)
		})
		.catch( err => next(err))
})

blogRouter.delete('/:id', (request, response, next) => {
	Blog.findByIdAndDelete(request.params.id)
		.then( result => {
			response.status(204).end()
		})
		.catch( err => next(err))
})

module.exports = blogRouter
