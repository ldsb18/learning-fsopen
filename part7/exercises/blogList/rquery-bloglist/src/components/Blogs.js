import { useState } from "react"

const Blog = ({ blog, addLikes, eraseBlog }) => {
	const blogStyle = {
		paddingTop: 5,
		paddingLeft: 5,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	}

	const [detailed, setDetailed] = useState(false)

	const hideDetails = { display: detailed ? "none" : "" }
	const showDetails = { display: detailed ? "" : "none" }

	const toogleDetails = () => {
		setDetailed(!detailed)
	}

	return (
		<div style={blogStyle} className="blogs">
			<div style={hideDetails} className="undetailedBlog">
				{blog.title} - {blog.author}
				<button id="showButton" onClick={() => toogleDetails()}>
					View
				</button>
			</div>

			<div style={showDetails} className="detailedBlog">
				<p>
					Title: {blog.title} - by {blog.author}
					<button onClick={() => toogleDetails()}>Hide</button>
				</p>

				<p>URL: {blog.url}</p>

				<p>
					Likes: {blog.likes}
					<button
						className="likeButton"
						onClick={() => addLikes(blog)}>
						Like
					</button>
				</p>

				<p>From user: {blog.user.username}</p>

				<div>
					<button id="deleteButton" onClick={() => eraseBlog(blog)}>
						DELETE
					</button>
				</div>
			</div>
		</div>
	)
}

const Blogs = ({ blogs, addLikes, eraseBlog }) => {
	return (
		<div>
			<h2>Blogs</h2>

			{blogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					addLikes={addLikes}
					eraseBlog={eraseBlog}
					className="blogs"
				/>
			))}
		</div>
	)
}

export default Blogs
