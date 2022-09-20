const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/Blog')

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs
		.map( blog  => new Blog(blog))

	const promiseArray = blogObjects.map( blog => blog.save())
	await Promise.all(promiseArray)

})

describe('blogsAPI', () => {

	test('There are 6 blogs, and them are returned as JSON', async () => {
		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('A specific blog can be viewed', async () => {
		const blogsAtStart = await helper.blogsInDb()

		const blogToView = blogsAtStart[0]

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

		expect(resultBlog.body).toEqual(processedBlogToView)

	})

	test('Unique identifier property of the blog posts is named id', async () => {
		const blogs = await helper.blogsInDb()

		blogs.forEach( blog => {
			expect(blog.id).toBeDefined()//This checks if 'id' property exist forEach blog
			expect(blog._id).not.toBeDefined()//This checks if '_id' property does not exist forEach blog
		})
	})
})

afterAll( () => {
	mongoose.connection.close()
})