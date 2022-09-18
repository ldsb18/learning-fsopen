const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return (
		blogs.reduce( (sum, blog) => {
			return blog.likes + sum
		}, 0)
	)
}

const favoriteBlog = (blogs) => {
	
	const max = {
		title: '',
		author: '',
		likes: 0
	}

	
	blogs.forEach(blog => {
		if (blog.likes > max.likes) {
			max.likes = blog.likes
			max.author = blog.author
			max.title = blog.title
		}
	})

	return blogs.length === 0
		?	null
		:	max
}

const mostBlogs = (blogs) => {

	const blogsByAuthor = _.countBy( _.map(blogs, _.property('author')) )

	const mostBlogs = {
		author: '',
		blogs: 0
	}

	_.forEach(blogsByAuthor, (value, key) => {
		if (mostBlogs.blogs < value) {
			mostBlogs.author = key,
			mostBlogs.blogs = value
		}
	})

	return blogs.length === 0
		? null
		: mostBlogs
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}