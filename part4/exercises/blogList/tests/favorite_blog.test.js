const listHelper = require('../utils/list_helper')

const blogs = require('./test_helper').initialBlogs

describe('Favorite blog', () => {

	test('of empty list is null', () => {
		expect(listHelper.favoriteBlog([])).toBe(null)
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

		expect(listHelper.favoriteBlog(blogsWithOneElement)).toEqual({
			title: "React patterns",
			author: "Michael Chan",
			likes: 7
		})
	})

	test('of a bigger list is calculated right', () => {

		expect(listHelper.favoriteBlog(blogs)).toEqual({
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12
		})
	})
})