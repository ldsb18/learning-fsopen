const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)

	await User.deleteMany({})
	await User.insertMany(helper.initialUsers)
})

describe('Token TEST',() => {

	test('with valid user and password', async () => {

		const user = {
			username: 'Vaskyat',
			password: 'Bokita+123'
		}

		const tokenObject = await api	
			.post('/api/login')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/)

	})

	test('with invalid user and password', async () => {

		const user = {
			username: 'vaskyat',
			password: 'bokita+123'
		}

		const tokenObject = await api	
			.post('/api/login')
			.send(user)
			.expect(401)
			.expect('Content-Type', /application\/json/)

	})
})

describe('When there is initially some blogs saved', () => {

	test('There are 6 blogs, and them are returned as JSON, HTTP 200', async () => {
		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('Unique identifier property of the blog posts is named id', async () => {
		const blogs = await helper.blogsInDb()

		blogs.forEach( blog => {
			expect(blog.id).toBeDefined()//This checks if 'id' property exist forEach blog
			expect(blog._id).not.toBeDefined()//This checks if '_id' property does not exist forEach blog
		})
	})

})

describe('Viewing a specific blog', () => {

	test('A specific blog can be viewed, HTTP 200', async () => {
		const blogsAtStart = await helper.blogsInDb()

		const blogToView = blogsAtStart[0]

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

		expect(resultBlog.body).toEqual(processedBlogToView)

	})

	test('A specific blog with an invalid Id cannot be viewed, HTTP 400', async () => {
		const invalidId = 'ab342958720cc1237cd'

		await api
			.get(`/api/blogs/${invalidId}`)
			.expect(400)
	})

	test('A specific blog with a nonexisting Id cannot be viewed, HTTP 404', async () => {
		const validNonExistingId = await helper.nonExistingBlogId()

		await api
			.get(`/api/blogs/${validNonExistingId}`)
			.expect(404)
	})

})

describe('Addition of a new blog', () => {

	test('A valid blog can be added, HTTP 201', async () => {

		const tokenObject = await api
			.post('/api/login') 
			.send({
				username: 'Vaskyat',
				password: 'Bokita+123'
			})
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const token = tokenObject.body.token

		const newBlog = {
			title: 'test blog to be added',
			author: 'Carlos V',
			url: 'http://charles-the/api/blogs',
			likes: 10000000
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
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
			'Carlos V'
		)
	})

	test('A valid blog with an invalid token cannot be added, HTTP 401', async () => {

		const newBlog = {
			title: 'test blog to be added',
			author: 'Carlos V',
			url: 'http://charles-the/api/blogs',
			likes: 10000000
		}

		const response = await api
			.post('/api/blogs')
			.set('Authorization', 'bearer 123')
			.send(newBlog)
			.expect(401)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

		const titles = blogsAtEnd.map( blog => blog.title)
		expect(titles).not.toContain(
			'test blog to be added'
		)

		const authors = blogsAtEnd.map( blog => blog.author)
		expect(authors).not.toContain(
			'Carlos V'
		)
	})

	test('A valid blog with "likes" property missing can be added, HTTP 201', async () => {

		const tokenObject = await api
			.post('/api/login') 
			.send({
				username: 'Vaskyat',
				password: 'Bokita+123'
			})
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const token = tokenObject.body.token

		const newBlog = {
			title: 'test blog to be added',
			author: 'Carlos V',
			url: 'http://localhost:3001/api/blogs'
		}

		const savedBlog = await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		expect(savedBlog.body.likes).toBe(0)
	})

	test('An invalid blog cannot be added, HTTP 400', async () => {

		const tokenObject = await api
			.post('/api/login') 
			.send({
				username: 'Vaskyat',
				password: 'Bokita+123'
			})
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const token = tokenObject.body.token

		const newBlog = {
			author: 'Carlos V',
			likes: 10000000
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

		const authors = blogsAtEnd.map( blog => blog.author)
		expect(authors).not.toContain(
			'Carlos V'
		)
	})
})

describe('Deletion of a blog', () => {

	test('Success with status 204 if id is valid and blog to correct user', async () => {
		const blogsAtStart = await helper.blogsInDb()

		const tokenObject = await api
			.post('/api/login')
			.send({
				username: 'Vaskyat',
				password: 'Bokita+123'
			})
			.expect(200)
			.expect('Content-type', /application\/json/)

		const token = tokenObject.body.token

		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `bearer ${token}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
		
		const titles = blogsAtEnd.map(blog => blog.title)//There can be more than 1 blog with the same author
		expect(titles).not.toContain(blogToDelete.title)

	})

	test('Fail with status 401 if id is valid but user do not own the blog', async () => {
		const blogsAtStart = await helper.blogsInDb()

		const tokenObject = await api
			.post('/api/login')
			.send({
				username: 'Crymat',// this user and password are OK, i extracted from 'requests'.
				password: 'DurotahEldroguis1!'// I regret putting such painful password to remember
			})
			.expect(200)
			.expect('Content-type', /application\/json/)

		const token = tokenObject.body.token

		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `bearer ${token}`)
			.expect(401)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
		
		const titles = blogsAtEnd.map(blog => blog.title)//There can be more than 1 blog with the same author
		expect(titles).toContain(blogToDelete.title)

	})

})

describe('Updating a blog', () => {

	test('A blog can be updated with valid data, HTTP 200', async () => {
		const blogsAtStart = await helper.blogsInDb()

		const blogToUpdate = blogsAtStart[0]

		const dataToUpdate = {
			title: 'Updated blog',
			author: 'Vaskyat',
			url: 'http://localhost:3001/',
			likes: 420
		}

		const updatedBlog = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(dataToUpdate)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
		
		const titles = blogsAtEnd.map( blog => blog.title )
		expect(titles).toContain(
			'Updated blog'
		)

		expect(titles).not.toContain(blogToUpdate.title)

	})

	test('A blog cannot be updated with invalid data, HTTP 400', async () => {

		const blogsAtStart = await helper.blogsInDb()

		const blogToUpdate = blogsAtStart[0]

		const dataToUpdate = {
			author: 'Canelo',
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(dataToUpdate)
			.expect(400)
	})
})

afterAll( () => {
	mongoose.connection.close()
})