import { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'


import blogService from './services/blogs'

const App = () => {

	const [ blogs, setBlogs ] = useState([])
	const [ user, setUser ] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs => {
			setBlogs( blogs )
		})
	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedUser')
		if (loggedUser) {
			setUser( JSON.parse(loggedUser) )
		}
	}, [])

	return(
		<div>
			{user === null

				? <LoginForm setUserState={setUser} />
				: <div>
					<Blogs blogs={blogs} setUserState={setUser} loggedUser={user} />
					<NewBlog blogs={blogs} setBlogsState={setBlogs} />
				</div>
			}
			
		</div>
	)

}

export default App;
