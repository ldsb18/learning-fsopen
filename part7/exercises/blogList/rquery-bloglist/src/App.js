import { useState, useEffect, useRef, useContext } from "react"

import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import { useNotificationValue } from "./contexts/notificationContext"

import blogService from "./services/blogs"
import  { getBlogs } from "./requests/requests"
import { useQuery } from "@tanstack/react-query"

const App = () => {

	const [user, setUser] = useState(null)
	const notification = useNotificationValue()

	const newBlogRef = useRef()

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser")
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const blogsResult = useQuery({
		queryKey: ['blogs'],
		queryFn: getBlogs
	})
	const blogs = blogsResult.data

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
					{blogsResult.isSuccess
						? <Blogs 
							blogs={
								blogs.sort((a, b) => {
									return b.likes - a.likes
								})
							}
						/>
						: <div> loading blogs... </div>
					}
					<br />
					<Togglable buttonLabel="New Blog" ref={newBlogRef}>
						<NewBlog reference={newBlogRef}/>
					</Togglable>
				</div>
			)}
		</div>
	)
}

export default App
