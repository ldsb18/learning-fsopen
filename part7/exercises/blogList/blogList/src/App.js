import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
	BrowserRouter as Router,
	Routes, Route, Link
} from 'react-router-dom'

import Notification from "./components/Notification"
import Blogs from "./components/Blogs"
import Users from "./components/Users"
import LoginForm from "./components/LoginForm"

import blogService from "./services/blogs"

import { logUser } from "./reducers/loggedUserReducer"

const App = () => {
	const loggedUser = useSelector(({ loggedUser }) => loggedUser)

	const dispatch = useDispatch()


	useEffect(() => {
		const loggedUser_local = window.localStorage.getItem("loggedUser")
		if (loggedUser_local) {
			const user = JSON.parse(loggedUser_local)
			dispatch(logUser(user))
			blogService.setToken(user.token)
		}
	}, [])

	const logout = () => {
		window.localStorage.removeItem("loggedUser")
		dispatch(logUser(null))
		blogService.setToken(null)
	}

	return (
		<div className="appContainer">
			<Notification />

			{loggedUser === null ? (
				<LoginForm />
			) : (
				<Router>
					<div>
						<h1>Blogs application</h1>
						<div>
							<p>{loggedUser.username} logged-in</p>
							<button onClick={logout}>logout</button>
						</div>

						<Routes>
							<Route path="/" element={<Blogs />} />
							<Route path="/users" element={<Users />} />
						</Routes>

					</div>
				</Router>
			)}
		</div>
	)
}

export default App
