import { useEffect, useRef, useContext } from "react"
import { useQuery } from "@tanstack/react-query"

import Blogs from "./components/Blogs"
import LoginForm from "./components/LoginForm"
import NewBlog from "./components/NewBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import userContext from "./contexts/userContext"
import { NotificationContextProvider } from "./contexts/notificationContext"

import  { getBlogs } from "./requests/requests"

const App = () => {

	const [user, userDispatch] = useContext(userContext)
	const newBlogRef = useRef()

	useEffect(() => {	
		userDispatch({
			payload: null,
			type: "initialize"
		})		
	}, []) 

	const blogsResult = useQuery({
		queryKey: ['blogs'],
		queryFn: getBlogs
	})
	const blogs = blogsResult.data

	const logout = () => {
		window.localStorage.removeItem("loggedUser")
		userDispatch({
			payload: null,
			type: "logout"
		})
	}

	return (
		<div className="appContainer">
			<NotificationContextProvider>
				<Notification/>
		
				{user === null ? (
					<LoginForm />
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
			</NotificationContextProvider>
		</div>
	)
}

export default App
