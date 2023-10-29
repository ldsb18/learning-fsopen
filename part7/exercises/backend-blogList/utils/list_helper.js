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

	const blogsPerAuthor = _.countBy( _.map(blogs, _.property('author')) )

	const mostBlogs = {
		author: '',
		blogs: 0
	}

	_.forEach(blogsPerAuthor, (value, key) => {
		if (mostBlogs.blogs < value) {
			mostBlogs.author = key,
			mostBlogs.blogs = value
		}
	})

	return blogs.length === 0
		? null
		: mostBlogs
}

const mostLikes = (blogs) => {

	const topLikes = {
		author: '',
		likes: 0
	}

	const authors = _.map(blogs, 'author')
	const likes = _.map(blogs, 'likes')

	const mergedAuthorsObject = authors.map( (item, index) => {
		return {
			author: item,
			likes: likes[index]
		}
	})

	const transformedMergedObject = _.mapValues( _.groupBy(mergedAuthorsObject, 'author'), (array) => {
		return array.reduce( (sum, item) => {
			return item.likes + sum
		}, 0)
	})

	_.forEach(transformedMergedObject, (value, key) => {
		if(topLikes.likes < value){
			topLikes.author = key
			topLikes.likes = value
		}
	})

	return blogs.length === 0
		? 0
		: topLikes
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}