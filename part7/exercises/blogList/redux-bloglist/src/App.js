import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setNotification } from "./reducers/notificationReducer"

import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const notification = useSelector(({ notification }) => notification)

	const dispatch = useDispatch()

	useEffect(() => {
		blogService.getAll().then(blogs => {
			setBlogs(
				blogs.sort((a, b) => {
					return b.likes - a.likes
				}),
			)
		})
	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser")
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const newBlogRef = useRef()

	const logout = () => {
		window.localStorage.removeItem("loggedUser")
		setUser(null)
		blogService.setToken(null)
	}

	const addLikes = async oneBlog => {
		try {
			const updatedBlog = await blogService.put(oneBlog.id, {
				...oneBlog,
				likes: oneBlog.likes + 1,
			})

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

	const newBlog = async blog => {
		try {
			const newBlog = await blogService.post({
				title: blog.title,
				author: blog.author,
				url: blog.url,
			})

			setBlogs(blogs.concat(newBlog))

			newBlogRef.current.toggleVisibility()

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

	return (
		<div className="appContainer">
			<Notification notification={notification} />

			{user === null ? (
				<LoginForm
					setUserState={setUser}
				/>
			) : (
				<div>
					<p>
						{user.username} logged-in{" "}
						<button onClick={logout}>logout</button>{" "}
					</p>
					<Blogs
						blogs={blogs}
						addLikes={addLikes}
						eraseBlog={eraseBlog}
					/>
					<br />
					<Togglable buttonLabel="New Blog" ref={newBlogRef}>
						<NewBlog newBlog={newBlog} />
					</Togglable>
				</div>
			)}
		</div>
	)
}

export default App
