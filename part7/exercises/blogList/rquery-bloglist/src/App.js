import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"

import { logUser } from "./reducers/userReducer"

const App = () => {

	const user = useSelector(({ user }) => user)
	
	const dispatch = useDispatch()

	const newBlogRef = useRef()

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser")
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			dispatch(logUser(user))
			blogService.setToken(user.token)
		}
	}, [])

	const logout = () => {
		window.localStorage.removeItem("loggedUser")
		dispatch(logUser(null))
		blogService.setToken(null)
	}

	return (
		<div className="appContainer">
			<Notification/>

			{user === null ? (
				<LoginForm/>
			) : (
				<div>
					<p>
						{user.username} logged-in{" "}
						<button onClick={logout}>logout</button>{" "}
					</p>
					<Blogs/>
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
