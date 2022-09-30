import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog }) => {

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
					<button>Like</button>
				</p>

				<p>{ blog.user.username }</p>
				
			</div>
		</div>
	)
}

const Blogs = ({ blogs, setUserState, loggedUser}) => {

	const logout = () => {
		window.localStorage.removeItem('loggedUser')
		setUserState(null)
		blogService.setToken(null)
	}

	return(
		<div>
			<h2>Blogs</h2>

			<p>{loggedUser.username} logged-in <button onClick={logout}>logout</button> </p>

			{blogs.map(blog => 
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)
}

export default Blogs

