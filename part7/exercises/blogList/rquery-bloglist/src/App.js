import { useState, useEffect, useRef, useContext } from "react"

import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import notificationContext from "./contexts/notificationContext"

import blogService from "./services/blogs"
import { getBlogs } from "./requests/requests"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const GLOBAL_NOTIF_TIME = 4000

const App = () => {
	const queryClient = useQueryClient()

	const [user, setUser] = useState(null)
	const [notification, dispatch] = useContext(notificationContext)

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser")
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const blogsResult = useQuery({
		queryKey: ["blogs"],
		queryFn: getBlogs,
	})
	const blogs = blogsResult.data

	const newBlogRef = useRef()

	const handleNotification = (payload, type) => {
		dispatch({
			payload,
			type,
		})
		setTimeout(() => {
			dispatch({
				payload: null,
				type: "empty",
			})
		}, GLOBAL_NOTIF_TIME)
	}

	const logout = () => {
		window.localStorage.removeItem("loggedUser")
		setUser(null)
		blogService.setToken(null)
	}

	/* 	const addLikes = async oneBlog => {
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
			handleNotification(exception.response.data.error, "error")
		}
	}

	const eraseBlog = async blog => {
		window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
		try {
			await blogService.deleteBlog(blog.id)

			setBlogs(blogs.filter(b => b.id !== blog.id))
			handleNotification(`${blog.title} deteled successfully`, "message")
		} catch (exception) {
			handleNotification(exception.response.data.error, "error")
		}
	} */

	/* 	const newBlog = async blog => {
		try {
			const newBlog = await blogService.post({
				title: blog.title,
				author: blog.author,
				url: blog.url,
			})

			setBlogs(blogs.concat(newBlog))

			newBlogRef.current.toggleVisibility()

			handleNotification(
				`Blog "${newBlog.title}" created successfully`,
				"message",
			)
		} catch (exception) {
			handleNotification(exception.response.data.error, "error")
		}
	} */

	return (
		<div className="appContainer">
			<Notification notification={notification} />

			{user === null ? (
				<LoginForm setUserState={setUser} />
			) : (
				<div>
					<p>
						{user.username} logged-in{" "}
						<button onClick={logout}>logout</button>{" "}
					</p>
					{blogsResult.isSuccess ? (
						<Blogs
							blogs={blogs}
							addLikes={() => console.log("like")}
							eraseBlog={() => console.log("erase")}
						/>
					) : (
						<div> loading blogs... </div>
					)}
					<br />
					<Togglable buttonLabel="New Blog" ref={newBlogRef}>
						<NewBlog reference={newBlogRef} />
					</Togglable>
				</div>
			)}
		</div>
	)
}

export default App
