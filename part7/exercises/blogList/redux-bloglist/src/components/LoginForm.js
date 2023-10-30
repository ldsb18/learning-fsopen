import { useState } from "react"

import loginService from "../services/login"
import blogService from "../services/blogs"

const LoginForm = ({ setUserState, setNotification }) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem("loggedUser", JSON.stringify(user))
			setUserState(user)
			blogService.setToken(user.token)

			setUsername("")
			setPassword("")

			setNotification(`Username "${user.username}" logged successfully`)
		} catch (exception) {
			setNotification(exception.response.data.error, "error")
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
