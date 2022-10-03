import { useState, useEffect } from 'react'


import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


import blogService from './services/blogs'


const GLOBAL_NOTIF_TIME = 4000


const App = () => {

	const [ blogs, setBlogs ] = useState([])
	const [ user, setUser ] = useState(null)
	const [ notification, setNotification ] = useState({
		message: null,
		type: ''
	})

	useEffect(() => {
		blogService.getAll().then(blogs => {
			setBlogs( blogs.sort( (a, b) => {
				return b.likes - a.likes
			}) )
		})

	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedUser')
		if (loggedUser) {
			setUser( JSON.parse(loggedUser) )
		}
	}, [])

	const handleNotification = (message, type) => {

		setNotification({
			message,
			type
		})
		setTimeout(() => {
			setNotification({
				message: null,
				type: ''
			})
		}, GLOBAL_NOTIF_TIME)

	}

	const logout = () => {
		window.localStorage.removeItem('loggedUser')
		setUser(null)
		blogService.setToken(null)
	}

	return(
		<div>
			<Notification notification={notification} />

			{user === null

				? <LoginForm
					setUserState={setUser}
					setNotification={handleNotification}
				/>
				: <div>
					<p>{user.username} logged-in <button onClick={logout}>logout</button> </p>
					<Blogs
						blogs={blogs}
						setBlogsState={setBlogs}
						setUserState={setUser}
						setNotification={handleNotification}
					/>
					<br />
					<Togglable buttonLabel='New Blog'>
						<NewBlog
							blogs={blogs}
							setBlogsState={setBlogs}
							setNotification={handleNotification}
						/>
					</Togglable>
				</div>
			}

		</div>
	)

}

export default App
