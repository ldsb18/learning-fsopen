import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"

import { initializeBlogs } from "./reducers/blogReducer"

const App = () => {
	const blogs = useSelector(({blogs}) => blogs)
	const [user, setUser] = useState(null)
	const notification = useSelector(({ notification }) => notification)

	const dispatch = useDispatch()

	const newBlogRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs => {
			dispatch(initializeBlogs(
				blogs.sort((a, b) => {
					return b.likes - a.likes
				}),
			))
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


	const logout = () => {
		window.localStorage.removeItem("loggedUser")
		setUser(null)
		blogService.setToken(null)
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
					/>
					<br />
					<Togglable buttonLabel="New Blog" ref={newBlogRef}>
						<NewBlog
							reference={newBlogRef}
						/>
					</Togglable>
				</div>
			)}
		</div>
	)
}

export default App
