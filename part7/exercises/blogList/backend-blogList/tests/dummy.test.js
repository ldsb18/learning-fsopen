const listHelper = require('../utils/list_helper')

describe('Dummy', () => {
	test('Return one', () => {
		const blogs = []
	
		const result = listHelper.dummy(blogs)
		expect(result).toBe(1)
	})
})