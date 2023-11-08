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
import loginService from "./services/login"

import { logUser } from "./reducers/loggedUserReducer"

const style = {
	padding: 5
}

const App = () => {
	const loggedUser = useSelector(({ loggedUser }) => loggedUser)

	const dispatch = useDispatch()
	useEffect(() => {
		const loggedUser_local = window.localStorage.getItem("loggedUser")
		if (loggedUser_local) {
			const user = JSON.parse(loggedUser_local)

			loginService.checkToken(user.token)
			.then(() => {
				dispatch(logUser(user))
				blogService.setToken(user.token)
			})
			.catch(err => {
				window.localStorage.removeItem("loggedUser")
			})
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
						<Link style={style} to="/" >BLOGS</Link>
						<Link style={style} to="/users" >USERS</Link>
						<span>{loggedUser.username} logged-in <button onClick={logout}>logout</button></span>
					</div>

					<div>
						<h1>Blogs application</h1>

						<Routes>
							<Route path="*" element={<Blogs />} />
							<Route path="/users/*" element={<Users />} />
						</Routes>

					</div>
				</Router>
			)}
		</div>
	)
}

export default App
