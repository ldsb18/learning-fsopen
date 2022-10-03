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

	const addLikes = async(oneBlog) => {
		try{
			const updatedBlog = await blogService.put(oneBlog.id , { ...oneBlog, likes: oneBlog.likes + 1 })

			setBlogs(blogs.map( b => b.id === updatedBlog.id ? { ...b, likes: b.likes + 1 } : b).sort( (a, b) => b.likes - a.likes))//updatedBlog var do not have the user property populated
		} catch(exception) {
			setNotification(exception.response.data.error, 'error')
		}
	}

	const eraseBlog = async(blog) => {
		window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
		try {
			await blogService.deleteBlog(blog.id)

			setBlogs( blogs.filter( b => b.id !== blog.id) )
		} catch(exception) {
			setNotification(exception.response.data.error, 'error')
		}
	}

	const newBlog = async (blog) => {

		try {
			const newBlog = await blogService.post({
				title: blog.title,
				author: blog.author,
				url: blog.url
			})

			setBlogs( blogs.concat(newBlog) )

			setNotification(`Blog "${newBlog.title}" created successfully`, 'message')

		} catch(exception) {
			setNotification(exception.response.data.error, 'error')
		}
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
						addLikes={addLikes}
						eraseBlog={eraseBlog}
					/>
					<br />
					<Togglable buttonLabel='New Blog'>
						<NewBlog
							newBlog={newBlog}
						/>
					</Togglable>
				</div>
			}

		</div>
	)

}

export default App
