import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import { TableBody, TableContainer, TableRow, Paper, Table, TableCell, TextField, Button } from "@mui/material"

import { setNotification } from "../reducers/notificationReducer"
import { initializeBlogs, deleteBlog, likeBlog, commentBlog } from "../reducers/blogReducer"

import NewBlog from "../components/NewBlog"
import Togglable from "../components/Togglable"

import blogService from "../services/blogs"

const Comments = ({ comments }) => {

	return (
		<div>
			<h2>Comments:</h2>

			<ul>
				{comments.length !== 0
					?	comments.map((cmt, index) => (
							<li key={index}> { cmt } </li>
						))
					:	<p>Nothing here...</p>
				}
			</ul>

		</div>
	)
}

const UndetailedBlog = ({ blogs }) => {
	const newBlogRef = useRef()
	const navigate = useNavigate()

	return (
		<div>
			<h2>Blogs</h2>

			<TableContainer component={Paper} >
				<Table>
					<TableBody>
						{blogs.map(blog => (
							<TableRow key={blog.id} onClick={() => navigate(`/blogs/${blog.id}`)}>
								<TableCell>
									{blog.title}
								</TableCell>
								<TableCell>
									Author: {blog.author}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Togglable buttonLabel="New Blog" ref={newBlogRef}>
				<NewBlog reference={newBlogRef} />
			</Togglable>
			
		</div>
	)

}

const DetailedBlog = ({ blog }) => {

	const [comment, setComment] = useState('')

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

	const handleComment = async evt => {
		evt.preventDefault()

		try{

			const commentedBlog = await blogService.comment(blog.id, comment)

			dispatch(commentBlog(commentedBlog))
			console.log(commentedBlog);
			
			setComment("")
			dispatch(
				setNotification(
					{
						message: `New comment added`,
						type: "message"
					},
					3
				)
			)
		} catch (excep) {

			console.log(excep);

			dispatch(
				setNotification(
					{
						message: excep.response.data.error,
						type: "error"
					},
					5
				)
			)
		}
	}

	if(!blog) return null

	return (
		<div>
			<div>
				<h2>Title: {blog.title} - by {blog.author}</h2>

				<p>URL: {blog.url}</p>

				<p>From user: {blog.user.username}</p>

				<p>
					Likes: {blog.likes}
				</p>

				<Button variant="contained"
					className="likeButton"
					onClick={() => addLikes(blog)}>
					LIKE BLOG
				</Button>
			
				<Button variant="contained" color="secondary" id="deleteButton" onClick={() => eraseBlog(blog)}>
					DELETE BLOG
				</Button>
			</div>

			<Comments comments={blog.comments}/>

			<div>
				<form onSubmit={handleComment}>
					<div>
						<TextField
							label="comment"
							id="comment"
							type="text"
							value={comment}
							name="comment"
							placeholder="comment"
							onChange={({ target }) => setComment(target.value)}
						/>
					</div>

					<Button variant="contained" type="submit" id="commentButton">
						Comment
					</Button>
				</form>
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
