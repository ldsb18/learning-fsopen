import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blogs from './Blogs'

const testBlog = [
	{
		title: 'Test title1',
		author: 'Vaskyat',
		url: 'http',
		likes: 42,
		user: 123456,
		id: 1
	}
]

describe('<Blogs />', () => {

	let container

	beforeEach(() => {

		const setBlogsState = jest.fn()
		const setNotification = jest.fn()

		container  = render(
			<Blogs blogs={testBlog} setBlogsState={setBlogsState} setNotification={setNotification} />
		).container
	})

	test('Renders only title and author', async () => {
		const titleAndAuthor = container.querySelector('.undetailedBlog')
		expect(titleAndAuthor).toHaveTextContent(
			'Test title1 - Vaskyat'
		)

		expect(titleAndAuthor).not.toHaveTextContent(
			'http'
		)

		expect(titleAndAuthor).not.toHaveTextContent(
			'42'
		)

		const detailedDiv = container.querySelector('.detailedBlog')
		expect(detailedDiv).toHaveStyle('display: none')
	})
})