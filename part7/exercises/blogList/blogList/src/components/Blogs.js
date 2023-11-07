import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Link, Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import { setNotification } from "../reducers/notificationReducer"
import { initializeBlogs, deleteBlog, likeBlog } from "../reducers/blogReducer"

import NewBlog from "../components/NewBlog"
import Togglable from "../components/Togglable"

import blogService from "../services/blogs"

const Blog = ({ blog }) => {
	const blogStyle = {
		padding: 5,
		border: "solid",
		borderWidth: 1,
		marginBottom: 10,
	}

	return (
		<div style={blogStyle} className="blogs">
			<div>
				<Link to={`/blogs/${blog.id}`} >{blog.title} - {blog.author}</Link>
			</div>

			{/* <div style={showDetails} className="detailedBlog">
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
			</div> */}
		</div>
	)
}

const UndetailedBlog = ({ blogs }) => {

	const newBlogRef = useRef()

	return (
		<div>
			<h2>Blogs</h2>

			{blogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
				/>
			))}

			<Togglable buttonLabel="New Blog" ref={newBlogRef}>
				<NewBlog reference={newBlogRef} />
			</Togglable>
			
		</div>
	)

}

const DetailedBlog = ({ blog }) => {

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const addLikes = async oneBlog => {
		try {
			await blogService.put(oneBlog.id, {
				...oneBlog,
				likes: oneBlog.likes + 1,
			})

			dispatch(likeBlog(oneBlog.id))
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

			dispatch(deleteBlog(blog))
			dispatch(
				setNotification(
					{
						message: `${blog.title} deteled successfully`,
						type: "message",
					},
					10,
				),
			)

			navigate('/')

		} catch (exception) {
			dispatch(
				setNotification(
					{ message: exception.response.data.error, type: "error" },
					10,
				),
			)
		}
	}

	if(!blog) return null

	return (
		<div>
			<h2>Title: {blog.title} - by {blog.author}</h2>

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
	)
}

const Blogs = () => {
	const blogs = useSelector(({ blogs }) => blogs)

	const dispatch = useDispatch()

	const match = useMatch('/blogs/:id')
	const blog = match
		? blogs.find(b => b.id === match.params.id)
		: null

	useEffect(() => {
		blogService.getAll().then(blogs => {
			dispatch(
				initializeBlogs(
					blogs.sort((a, b) => {
						return b.likes - a.likes
					}),
				),
			)
		})
	}, [])

	/* const addLikes = async oneBlog => {
		try {
			await blogService.put(oneBlog.id, {
				...oneBlog,
				likes: oneBlog.likes + 1,
			})

			dispatch(likeBlog(oneBlog.id))
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

			dispatch(deleteBlog(blog))
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
	} */

	return (
		<div>
			<Routes>
				<Route path="/" element={<UndetailedBlog blogs={blogs} />} />
				<Route path='/blogs/:id' element={<DetailedBlog blog={blog} />} />
			</Routes>
		</div>
	)
}

export default Blogs
