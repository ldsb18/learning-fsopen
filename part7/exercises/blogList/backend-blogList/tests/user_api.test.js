const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach( async () => {
	await User.deleteMany({})
	await User.insertMany(helper.initialUsers)
})

describe('Creation of user', () => {

	test('Fails with status 400 when username is missing', async () => {
		const usersAtStart = await User.find({})
		
		const noUsername = {
			name: 'Carlos V',
			password: 'TheKing24021500'
		}

		await api
			.post('/api/users')
			.send(noUsername)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await User.find({})
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

		const names = usersAtEnd.map(u => u.name)
		expect(names).not.toContain(noUsername.name)
		
	})

	test('Fails with status 400 when password is missing', async () => {
		const usersAtStart = await User.find({})
		
		const noPassword = {
			username: 'Carlos V',
			name: 'Carlos V'
		}

		const expectedError = await api
			.post('/api/users')
			.send(noPassword)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		expect(expectedError.body).toEqual({
			error: 'password required'
		})

		const usersAtEnd = await User.find({})
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('Fails with status 400 when username is already taken', async () => {
		const usersAtStart = await User.find({})
		
		const takenUsername = {
			username: 'Vaskyat',
			name: 'Carlos V',
			password: 'TheKing24021500'
		}

		const expectedError = await api
			.post('/api/users')
			.send(takenUsername)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		expect(expectedError.body).toEqual({ error: 'username is already taken' })

		const usersAtEnd = await User.find({})
		expect(usersAtEnd).toHaveLength(usersAtStart.length)		
	})

	test('Fails with status 400 when password is not long enough', async () => {
		const usersAtStart = await User.find({})
		
		const shortPassword = {
			username: 'Carlos V',
			name: 'Carlos V',
			password: '12'
		}

		const expectedError = await api
			.post('/api/users')
			.send(shortPassword)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		expect(expectedError.body).toEqual({ error: 'password is not long enough' })

		const usersAtEnd = await User.find({})
		expect(usersAtEnd).toHaveLength(usersAtStart.length)		
	})

})

afterAll( () => {
	mongoose.connection.close
})