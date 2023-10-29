import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import NewBlog from './NewBlog'

//test should check, that the form calls the event handler it received as props with the right details when a new blog is created

describe('<NewBlog />', () => {

	let container
	const newBlog = jest.fn()

	beforeEach(() => {
		container  = render(
			<NewBlog newBlog={newBlog} />
		).container
	})

	test('New blog is created with the right details', async () => {
		const user = userEvent.setup()

		const titleInput = screen.getByPlaceholderText('title')
		const authorInput = screen.getByPlaceholderText('author')
		const urlInput = screen.getByPlaceholderText('url')

		const submitButton = container.querySelector('.submitButton')

		await user.type(titleInput, 'title test')
		await user.type(authorInput, 'author test')
		await user.type(urlInput, 'url test')
		await user.click(submitButton)

		expect(newBlog.mock.calls).toHaveLength(1)
		expect(newBlog.mock.calls[0][0].title).toBe('title test')
		expect(newBlog.mock.calls[0][0].author).toBe('author test')
		expect(newBlog.mock.calls[0][0].url).toBe('url test')
	})

})