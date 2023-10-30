import React from "react"
import "@testing-library/jest-dom/extend-expect"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import Blogs from "./Blogs"

const testBlog = [
	{
		title: "Test title1",
		author: "Vaskyat",
		url: "http",
		likes: 42,
		user: 123456,
		id: 1,
	},
]

describe("<Blogs />", () => {
	let container
	const addLikes = jest.fn()
	const eraseBlog = jest.fn()

	beforeEach(() => {
		container = render(
			<Blogs
				blogs={testBlog}
				addLikes={addLikes}
				eraseBlog={eraseBlog}
			/>,
		).container
	})

	test("Renders only title and author", () => {
		const titleAndAuthor = container.querySelector(".undetailedBlog")
		expect(titleAndAuthor).toHaveTextContent("Test title1 - Vaskyat")

		const url = screen.queryByText("http")
		expect(url).toBeNull()

		const likes = screen.queryByText("42")
		expect(likes).toBeNull()

		const detailedDiv = container.querySelector(".detailedBlog")
		expect(detailedDiv).toHaveStyle("display: none")
	})

	test('Shows likes and URL when "show" button clicked', async () => {
		const undetailedBlog = screen.queryByText("Test title1 - Vaskyat")
		expect(undetailedBlog).toHaveStyle("display: block")

		const detailedBlog = container.querySelector(".detailedBlog")
		expect(detailedBlog).toHaveStyle("display: none")

		const user = userEvent.setup()
		const button = screen.getByText("View")
		await user.click(button)

		expect(undetailedBlog).toHaveStyle("display: none")
		expect(detailedBlog).toHaveStyle("display: block")

		const url = screen.queryByText("http")
		expect(url).toBeDefined()

		const likes = screen.queryByText("42")
		expect(likes).toBeDefined()
	})

	test("the likes button is clicked twice and the event handler is called twice", async () => {
		const user = userEvent.setup()
		const likeButton = container.querySelector(".likeButton")

		await user.click(likeButton)
		await user.click(likeButton)

		expect(addLikes.mock.calls).toHaveLength(2)
	})
})
