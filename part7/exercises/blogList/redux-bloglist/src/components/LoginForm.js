import { useState } from "react"
import { useDispatch } from "react-redux"

import loginService from "../services/login"
import blogService from "../services/blogs"

import { setNotification } from "../reducers/notificationReducer"
import { logUser } from "../reducers/userReducer"

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
					username:
					<input
						id="username"
						type="text"
						value={username}
						name="username"
						placeholder="username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>

				<div>
					password:
					<input
						id="password"
						type="password"
						value={password}
						name="password"
						placeholder="password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>

				<button type="submit" id="loginButton">
					Login
				</button>
			</form>
		</div>
	)
}

export default LoginForm
