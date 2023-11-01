import { useState } from "react"
import { useDispatch } from "react-redux"

import { setNotification } from "../reducers/notificationReducer"
import { setBlogs } from "../reducers/blogReducer"

import blogService from '../services/blogs'

const NewBlog = ({ reference }) => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	const dispatch = useDispatch()

	const newBlog = async blog => {
		try {
			const newBlog = await blogService.post({
				title: blog.title,
				author: blog.author,
				url: blog.url,
			})

			dispatch(
				setBlogs(newBlog)
			)

			reference.current.toggleVisibility()

			dispatch(
				setNotification(
					{
						message: `Blog "${newBlog.title}" created successfully`,
						type: "message",
					},
					10,
				),
			)
		} catch (exception) {
			dispatch(
				setNotification(
					{ message: exception.response.data.error, type: "error" },
					10,
				),
			)
		}
	}

	const postBlog = event => {
		event.preventDefault()

		const blogsToPost = {
			title,
			author,
			url,
		}

		newBlog(blogsToPost)
		setTitle("")
		setAuthor("")
		setUrl("")
	}

	return (
		<div>
			<h2>Create a new Blog</h2>
			<form onSubmit={postBlog}>
				<div>
					Title:
					<input
						id="title"
						type="text"
						value={title}
						name="title"
						placeholder="title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>

				<div>
					Author:
					<input
						id="author"
						type="text"
						value={author}
						name="author"
						placeholder="author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>

				<div>
					URL:
					<input
						id="url"
						type="text"
						value={url}
						name="url"
						placeholder="url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>

				<button type="submit" className="submitButton">
					Create
				</button>
			</form>
		</div>
	)
}

export default NewBlog
