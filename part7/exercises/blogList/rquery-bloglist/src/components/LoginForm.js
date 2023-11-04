import { useState } from "react"

import { login } from "../requests/requests"

import { useNotificationDispatch } from "../contexts/notificationContext"
import { useUserDispatch } from "../contexts/userContext"

const LoginForm = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const userDispatch = useUserDispatch()
	const dispatchFunc = useNotificationDispatch()

	const customDispatch = ({ payload, type}) => {
		dispatchFunc({ payload, type })
		setTimeout(() => {
			dispatchFunc({
				payload: null,
				type: "empty"
			})
		}, 5000)
	}

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const user = await login({
				username,
				password,
			})

			window.localStorage.setItem("loggedUser", JSON.stringify(user))
			userDispatch({
				payload: user,
				type: "login"
			})

			setUsername("")
			setPassword("")

			customDispatch({
				payload: `Username "${user.username}" logged successfully`,
				type: "message",
			})
		} catch (exception) {
			console.log(exception);
			customDispatch({ payload: exception.response.data.error, type: "error" })
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
