import { useState } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

const Blog = ({ blog, addLikes, eraseBlog }) => {

	const blogStyle = {
		paddingTop: 5,
		paddingLeft: 5,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const [ detailed, setDetailed ] = useState(false)

	const hideDetails = { display: detailed ? 'none' : '' }
	const showDetails = { display: detailed ? '' : 'none' }

	const toogleDetails = () => {
		setDetailed(!detailed)
	}


	return(
		<div style={blogStyle}>
			<div style={hideDetails}>
				{ blog.title } - { blog.author }
				<button onClick={() => toogleDetails()}>View</button>
			</div>

			<div style={showDetails}>
				<p>
					{ blog.title } - { blog.author }
					<button onClick={() => toogleDetails()}>Hide</button>
				</p>

				<p>{ blog.url }</p>

				<p>
					{ blog.likes }
					<button onClick={() => addLikes(blog)}>Like</button>
				</p>

				<p>{ blog.user.username }</p>

				<div>
					<button onClick={() => eraseBlog(blog)}>DELETE</button>
				</div>
			</div>
		</div>
	)
}

const Blogs = ({ blogs, setBlogsState, setUserState, loggedUser, setNotification }) => {

	const logout = () => {
		window.localStorage.removeItem('loggedUser')
		setUserState(null)
		blogService.setToken(null)
	}

	const addLikes = async(oneBlog) => {
		try{
			const updatedBlog = await blogService.put(oneBlog.id , { ...oneBlog, likes: oneBlog.likes + 1 })

			setBlogsState(blogs.map( b => b.id === updatedBlog.id ? { ...b, likes: b.likes + 1 } : b).sort( (a, b) => b.likes - a.likes))//updatedBlog var do not have the user property populated
		} catch(exception) {
			setNotification(exception.response.data.error, 'error')
		}
	}

	const eraseBlog = async(blog) => {
		window.confirm(`remove blog ${blog.title} by ${blog.author}?`)
		try {
			await blogService.deleteBlog(blog.id)

			setBlogsState( blogs.filter( b => b.id !== blog.id) )
		} catch(exception) {
			setNotification(exception.response.data.error, 'error')
		}
	}

	return(
		<div>
			<h2>Blogs</h2>

			<p>{loggedUser.username} logged-in <button onClick={logout}>logout</button> </p>

			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} addLikes={addLikes} eraseBlog={eraseBlog}/>
			)}
		</div>
	)
}

Blogs.propTypes = {
	blogs: PropTypes.array.isRequired,
	setBlogsState: PropTypes.func.isRequired,
	setUserState: PropTypes.func.isRequired,
	loggedUser: PropTypes.object.isRequired,
	setNotification: PropTypes.func.isRequired
}

export default Blogs

