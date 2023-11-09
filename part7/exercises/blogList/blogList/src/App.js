import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
	BrowserRouter as Router,
	Routes, Route, Link
} from 'react-router-dom'

import { AppBar, Button, Container, Toolbar } from "@mui/material"

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
		<Container>
			<Notification />

			{loggedUser === null ? (
				<LoginForm />
			) : (
				<div>
					<Router>
						<AppBar position="sticky" >
							<Toolbar style={{display: "flex", justifyContent: "space-between"}}>
								<div>
									<Button color="inherit" component={Link} to="/" >
										BLOGS
									</Button>
									<Button color="inherit" component={Link} to="/users" >
										USERS
									</Button>
								</div>
								<div>
									<span>{loggedUser.username} logged-in</span>
									<Button color="inherit" onClick={logout}>logout</Button>
								</div>
							</Toolbar>
						</AppBar>
	
						<div>
							<h1>Blogs application</h1>
	
							<Routes>
								<Route path="*" element={<Blogs />} />
								<Route path="/users/*" element={<Users />} />
							</Routes>
	
						</div>
					</Router>
	
					<br />
					<br />
					<footer style={{textAlign: "center"}} ><em>All rights reserved @lauta_dsb</em></footer>
				</div>
			)}
		</Container>
	)
}

export default App
