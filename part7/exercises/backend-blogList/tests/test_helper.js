const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		user: '632e3b5437e728692a39ad83',
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		user: '632e3b6d37e728692a39ad86',
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		user: '632e3b8737e728692a39ad89',
		__v: 0
	}
]

const initialUsers = [
	{
		_id: '632e3b5437e728692a39ad83',
		username: 'Vaskyat',
		name: 'Root',
		passwordHash: '$2b$10$zM8Unb8oFeoabglWGBxBKubVRDtF5dOY1AhhpCs1GUl45kE1QJNGy',
		blogs: '5a422a851b54a676234d17f7',
		__v: 0
	},
	{
		_id: '632e3b6d37e728692a39ad86',
		username: 'Crymat',
		name: 'User1',
		passwordHash: '$2b$10$JDZsNa5QVGwF0908wB4USu9Un/kJVylg4M1GrywUpPi5zd.7wWa66',
		blogs: '5a422aa71b54a676234d17f8',
		__v: 0
	},
	{
		_id: '632e3b8737e728692a39ad89',
		username: 'cuervonero_23',
		name: 'User2',
		passwordHash: '$2b$10$uT/RX7uV1yF39kpc62j/G.mB4tLSnwf1zkqxjqVmAuHKoCiRlLX86',
		blogs: '5a422b3a1b54a676234d17f9',
		__v: 0
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})

	return blogs.map( blog => blog.toJSON() )
}

const usersInDb = async () => {
	const users = await User.find({})

	return users.map( user => user.toJSON() )
}

const nonExistingBlogId = async () => {
	const note = new Blog({ title: 'willremovethissoon', author: 'willremovethissoon', url: 'willremovethissoon'})

	await note.save()
	await note.remove()

	return note._id.toString()
}

module.exports = {
	initialBlogs,
	initialUsers,
	blogsInDb,
	usersInDb,
	nonExistingBlogId
}