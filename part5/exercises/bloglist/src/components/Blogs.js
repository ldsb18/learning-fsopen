const Blog = ({ blog }) => {
	return(
		<div>
			{blog.title} - {blog.author}
		</div>
	)
}

const Blogs = ({ blogs, setUserState, loggedUser}) => {

	const logout = () => {
		window.localStorage.removeItem('loggedUser')
		setUserState(null)
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