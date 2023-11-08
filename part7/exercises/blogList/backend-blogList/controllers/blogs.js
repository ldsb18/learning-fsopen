const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
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
	
	const { title, author, url, likes, comments } = request.body

	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!decodedToken.id) { 
		return response.status(401).json({
			error: 'token invalid or missing'
		})
	}

	const newBlog = new Blog({
		title,
		author,
		url,
		likes: likes || 0,
		comments: comments || [],
		user: request.user._id
	})

	const savedNote = await (await newBlog.save()).populate('user', {username: 1})

	request.user.blogs = request.user.blogs.concat(newBlog._id)
	await request.user.save()

	response.status(201).json(savedNote)
})

blogRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
	
	const { newComment } = request.body

	if(newComment.length < 2 ){
		return response.status(400).json({
			error: 'Comment is too short'
		})
	}

	const decodedToken = jwt.verify(request.token, process.env.SECRET)

	if (!decodedToken.id) { 
		return response.status(401).json({
			error: 'token invalid or missing'
		})
	}

	const blogToComment = await Blog.findById(request.params.id)

	if (!blogToComment) { 
		return response.status(404).json({
			error: 'Invalid blog ID'
		})
	}

	const updatedData = {
		title: blogToComment.title,
		author: blogToComment.author,
		url: blogToComment.url,
		likes: blogToComment.likes,
		comments: blogToComment.comments.concat(newComment)
	}

	const commentedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		updatedData,
		{ new: true, runValidators: true, context: 'query' }).populate('user', {username: 1})

	response.json(commentedBlog)
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

blogRouter.put('/:id', middleware.userExtractor, async (request, response) => {

	const body = request.body
	/* ANY USER CAN LIKE EVERY POST, BUT THIS CAUSES THAT EVERY USER CAN UPDATE ANY POST WITH ANY INFORMATION 	
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	const blogToUpdate = await Blog.findById(request.params.id)

	if ( blogToUpdate.user.toString() !== decodedToken.id ) {
		return response.status(401).json({
			error: 'user do not have permission to update this blog'
		})
	}  */
	
	const updatedData = {
		title: body.title || null,
		author: body.author || null,
		url: body.url || null,
		likes: body.likes || null,
		comments: body.comments || null
	}
	
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id, 
		updatedData, 
		{ new: true, runValidators: true, context: 'query' }).populate('user', {username: 1})


	response.json(updatedBlog)
})

module.exports = blogRouter
