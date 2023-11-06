import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createBlog } from "../requests/requests"

import { useUserValue } from "../contexts/userContext"
import { useNotificationDispatch } from "../contexts/notificationContext"

const NewBlog = ({ reference }) => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	const user = useUserValue()

	const queryClient = useQueryClient()
	const dispatchFunc = useNotificationDispatch()
	const customDispatch = ({ payload, type }) => {
		dispatchFunc({ payload, type })
		setTimeout(() => {
			dispatchFunc({
				payload: null,
				type: "empty",
			})
		}, 5000)
	}

	const newBlogMutation = useMutation({
		mutationFn: createBlog,
		onSuccess: newBlog => {
			const blogs = queryClient.getQueryData(["blogs"])
			queryClient.setQueryData(["blogs"], blogs.concat(newBlog))
			customDispatch({
				payload: `Blog "${newBlog.title}" created successfully`,
				type: "message",
			})
		},
		onError: e => {
			console.log(e)
			customDispatch({
				payload: e.response.data.error,
				type: "error",
			})
		},
	})

	const postBlog = async event => {
		event.preventDefault()

		newBlogMutation.mutate({ title, author, url, user })

		reference.current.toggleVisibility()

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
