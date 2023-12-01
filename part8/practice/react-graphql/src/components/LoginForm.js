import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ setToken, setError }) => {

	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')

	const [ login, result ] = useMutation(LOGIN, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message)
		}
	})

	useEffect(() => {
		if(result.data) {
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem('phonenumbers-user-token', token)
		}
	}, [result.data, setToken])

	const submit = async (evt) => {
		evt.preventDefault()

		login({ variables: { username, password } })
	}

	return(
		<div>
			<form onSubmit={submit}>
				<div>
					Username: <input 
						value={username}
						onChange={ ({ target }) => setUsername( target.value )}
					/>
				</div>

				<div>
					Password: <input 
						value={password}
						onChange={ ({ target }) => setPassword( target.value )}
						type="password"
					/>
				</div>

				<button type="submit">
					login
				</button>
			</form>
		</div>
	)
}

export default LoginForm