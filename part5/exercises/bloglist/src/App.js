import { useState, useEffect } from 'react'


import Blog from './components/Blogs'
import LoginForm from './components/LoginForm'


import blogService from './services/blogs'

const App = () => {

	const [ blogs, setBlogs ] = useState([])
	const [ user, setUser ] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs => {
			setBlogs( blogs )
		})
	}, [])

	return(
		<div>

			{user === null
				
				? <LoginForm setUserState={setUser} />

				: <div>
					<h2>Blogs</h2>

					<p>{user.username} logged-in</p>
		
					{blogs.map(blog => 
						<Blog key={blog.id} blog={blog} />
					)}
				</div>
			}
			
		</div>
	)

}

export default App;
