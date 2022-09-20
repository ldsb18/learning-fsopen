const listHelper = require('../utils/list_helper')

const blogs = require('./test_helper').initialBlogs

describe('Most likes', () => {
	test('of empty list is zero', () => {
		expect(listHelper.mostLikes([])).toBe(0)
	})

	test('when list has only one blog, equals the likes of that', () => {
		const blogsWithOneElement = [{
			_id: "5a422a851b54a676234d17f7",
			title: "React patterns",
			author: "Michael Chan",
			url: "https://reactpatterns.com/",
			likes: 7,
			__v: 0
		}]

		expect(listHelper.mostLikes(blogsWithOneElement)).toEqual({
			author: "Michael Chan",
			likes: 7
		})
	})

	test('of a bigger list is calculated right', () => {
		expect(listHelper.mostLikes(blogs)).toEqual({
			author: "Edsger W. Dijkstra",
			likes: 17
		})
	})
})
