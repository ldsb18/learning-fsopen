import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteBlog, updateBlog } from '../requests/requests'

import { useNotificationDispatch } from "../contexts/notificationContext"
import { useUserValue } from "../contexts/userContext"


const Blog = ({ blog, addLikes, eraseBlog }) => {
	const blogStyle = {
		paddingTop: 5,
		paddingLeft: 5,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	}

	const [detailed, setDetailed] = useState(false)

	const hideDetails = { display: detailed ? "none" : "" }
	const showDetails = { display: detailed ? "" : "none" }

	const toogleDetails = () => {
		setDetailed(!detailed)
	}

	return (
		<div style={blogStyle} className="blogs">
			<div style={hideDetails} className="undetailedBlog">
				{blog.title} - {blog.author}
				<button id="showButton" onClick={() => toogleDetails()}>
					View
				</button>
			</div>

			<div style={showDetails} className="detailedBlog">
				<p>
					Title: {blog.title} - by {blog.author}
					<button onClick={() => toogleDetails()}>Hide</button>
				</p>

				<p>URL: {blog.url}</p>

				<p>
					Likes: {blog.likes}
					<button
						className="likeButton"
						onClick={() => addLikes(blog)}>
						Like
					</button>
				</p>

				<p>From user: {blog.user.username}</p>

				<div>
					<button id="deleteButton" onClick={() => eraseBlog(blog)}>
						DELETE
					</button>
				</div>
			</div>
		</div>
	)
}

const Blogs = ({ blogs }) => {

	const queryClient = useQueryClient()
	
	const user = useUserValue()
	const dispatchFunc = useNotificationDispatch()
	const customDispatch = ({ payload, type}) => {
		dispatchFunc({ payload, type })
		setTimeout(() => {
			dispatchFunc({
				payload: null,
				type: "empty"
			})
		}, 5000)
	}

	const likeBlogMutation = useMutation({
		mutationFn: updateBlog,
		onSuccess: (updatedBlog) => {
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(
				['blogs'], 
				blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
			)
		},
		onError: e => {
			console.log(e)
			customDispatch({
				payload: e.response.data.error,
				type: "error",
			})
		},
	})

	const deleteBlogMutation = useMutation({
		mutationFn: deleteBlog,
		onError: e => {
			console.log(e)
			customDispatch({
				payload: e.response.data.error,
				type: "error",
			})
		},

	})

	const likeBlog = async (blog) => {
		likeBlogMutation.mutate({
			id: blog.id, 
			updatedBlog: {
			...blog, likes: blog.likes + 1 
			},
			user
		})
	}

	const eraseBlog = async (blogToDelete) => {
		window.confirm(`remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)
		try {
			deleteBlogMutation.mutate({
				id: blogToDelete.id,
				user
			})
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(
				['blogs'], 
				blogs.filter(b => b.id !== blogToDelete.id)
			)
			customDispatch({
				payload: `Blog ${blogToDelete.title} was erased succesfully`,
				type: "message"
			})
		} catch (e) {
			console.log(e);
		}

	}

	return (
		<div>
			<h2>Blogs</h2>

			{blogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					addLikes={likeBlog}
					eraseBlog={eraseBlog}
					className="blogs"
				/>
			))}
		</div>
	)
}

export default Blogs
