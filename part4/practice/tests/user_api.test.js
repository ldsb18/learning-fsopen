const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany({})

	const passwordHash = await bcrypt.hash('secret', 10)
	const user = new User({ username: 'Vaskyat', passwordHash})

	await user.save()
})

describe('when there is initially one user in db', () => {
	
	test('Creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)


		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map( u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('Creation fails with proper statuscode and message if username is already taken', async() => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'Vaskyat',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username must be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

})

afterAll( () => {
	mongoose.connection.close()
})