import { useState } from 'react'

import loginService from '../services/login'

const LoginForm = ({ setUserState }) => {

	const [ username, setUsername ] = useState('')
	const [ password, setPassword ] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password
			})

			window.localStorage.setItem(
				'loggedUser', JSON.stringify(user)
			)
			setUserState(user)

			setUsername('')
			setPassword('')
		} catch(exception) {
			console.log('ERROR', exception.message);
		}
		
	}

	return(
		<div>
			<h1>Log-in to application</h1>
			
			<form onSubmit={handleLogin}>
				<div>
					username:
					<input 
						type='text'
						value={username}
						name='username'
						onChange={ ({ target }) => setUsername(target.value) }
					/>
				</div>

				<div>
					password:
					<input 
						type='password'
						value={password}
						name='password'
						onChange={ ({ target }) => setPassword(target.value) }
					/>
				</div>

				<button type='submit'>Loggin</button>
			</form>
		</div>
	)
}

export default LoginForm
