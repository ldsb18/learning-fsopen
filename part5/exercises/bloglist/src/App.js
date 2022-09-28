import { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
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
				: <Blogs blogs={blogs} setUserState={setUser} loggedUser={user} />
			}
			
		</div>
	)

}

export default App;
