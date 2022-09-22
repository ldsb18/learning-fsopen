const listHelper = require('../utils/list_helper')

const blogs = require('./test_helper').initialBlogs

describe('Most blogs', () => {

	test('of empty list is null', () => {
		expect(listHelper.mostBlogs([])).toBe(null)
	})

	test('when list has only one blog', () => {
		const blogsWithOneElement = [{
			_id: '5a422a851b54a676234d17f7',
			title: 'React patterns',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7,
			__v: 0
		}]

		expect(listHelper.mostBlogs(blogsWithOneElement)).toEqual({
			author: 'Michael Chan',
			blogs: 1
		})
	})

	test('of a bigger list is calculated right', () => {
		expect(listHelper.mostBlogs(blogs)).toEqual({
			author: 'Robert C. Martin',
			blogs: 3
		})
	})
})