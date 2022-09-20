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

	test('A valid blog can be added', async () => {

		const newBlog = {
			title: 'test blog to be added',
			author: 'Vaskyat',
			url: 'http://localhost:3001/api/blogs',
			likes: 10000000
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const titles = blogsAtEnd.map( blog => blog.title)
		expect(titles).toContain(
			'test blog to be added'
		)

		const authors = blogsAtEnd.map( blog => blog.author)
		expect(authors).toContain(
			'Vaskyat'
		)
	})

	test('A valid blog with "likes" property missing can be added', async () => {

		const newBlog = {
			title: 'test blog to be added',
			author: 'Vaskyat',
			url: 'http://localhost:3001/api/blogs'
		}

		const savedBlog = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		expect(savedBlog.body.likes).toBe(0)
	})

})

afterAll( () => {
	mongoose.connection.close()
})