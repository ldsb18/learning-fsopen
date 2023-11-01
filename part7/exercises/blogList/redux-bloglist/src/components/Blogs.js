import { useState } from "react"
import PropTypes from "prop-types"

import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

import blogService from '../services/blogs'

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

	const dispatch = useDispatch()

	const addLikes = async oneBlog => {
		try {
			const updatedBlog = await blogService.put(oneBlog.id, {
				...oneBlog,
				likes: oneBlog.likes + 1,
			})

			/***Esto no funciona hasta que lo agregue blogs al store
			 * *podria forwadear la funcion al componente pero no tiene sentido si tengo que modificarlo en brevs 
			 */
			setBlogs(
				blogs
					.map(b =>
						b.id === updatedBlog.id
							? { ...b, likes: b.likes + 1 }
							: b,
					)
					.sort((a, b) => b.likes - a.likes),
			) //updatedBlog var do not have the user property populated
		} catch (exception) {
			dispatch(
				setNotification(
					{ message: exception.response.data.error, type: "error" },
					10,
				),
			)
		}
	}

	const eraseBlog = async blog => {
		try {
			window.confirm(`remove blog ${blog.title} by ${blog.author}?`) // If "cancel" option is selected, blog is deleted anyways .-.
			await blogService.deleteBlog(blog.id)

			/***Esto no funciona hasta que lo agregue blogs al store
			 * *podria forwadear la funcion al componente pero no tiene sentido si tengo que modificarlo en brevs 
			 */
			setBlogs(blogs.filter(b => b.id !== blog.id))
			dispatch(
				setNotification(
					{
						message: `${blog.title} deteled successfully`,
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

	return (
		<div>
			<h2>Blogs</h2>

			{blogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					addLikes={addLikes}
					eraseBlog={eraseBlog}
					className="blogs"
				/>
			))}
		</div>
	)
}

Blogs.propTypes = {
	blogs: PropTypes.array.isRequired,
}

export default Blogs
