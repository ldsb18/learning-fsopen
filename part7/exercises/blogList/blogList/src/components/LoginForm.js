import { useState } from "react"
import { useDispatch } from "react-redux"

import loginService from "../services/login"
import blogService from "../services/blogs"

import { TextField, Button } from "@mui/material"

import { setNotification } from "../reducers/notificationReducer"
import { logUser } from "../reducers/loggedUserReducer"

const LoginForm = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const dispatch = useDispatch()

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem("loggedUser", JSON.stringify(user))
			dispatch(logUser(user))
			blogService.setToken(user.token)

			setUsername("")
			setPassword("")

			dispatch(
				setNotification(
					{
						message: `Username "${user.username}" logged successfully`,
						type: "message",
					},
					5,
				),
			)
		} catch (exception) {
			dispatch(
				setNotification(
					{ message: exception.response.data.error, type: "error" },
					5,
				),
			)
		}
	}

	return (
		<div>
			<h1>Log-in to application</h1>

			<form onSubmit={handleLogin}>
				<div>
					<TextField
						label="username"
						id="username"
						type="text"
						value={username}
						name="username"
						placeholder="username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>

				<div>
					<TextField
						label="password"
						id="password"
						type="password"
						value={password}
						name="password"
						placeholder="password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				
				<div>
					<Button variant="contained" color="primary" type="submit" id="loginButton">
						Login
					</Button>
				</div>
			</form>
		</div>
	)
}

export default LoginForm
