import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import LoginForm from './components/LoginForm'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'

import { ALL_PERSONS } from './queries'

const Notify = ({ errorMessage }) => {

	if( !errorMessage ) {
		return null
	}

	return(
		<div style={{color: 'red'}}>
			{ errorMessage }
		</div>
	)
}

function App() {

	const [ token, setToken ] = useState(null)
	const [ errorMessage, setErrorMessage ] = useState(null)

	const client = useApolloClient()

	const result = useQuery(ALL_PERSONS)

	if (result.loading) {
		return <div>loading...</div>
	}

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 10000);
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	if(!token) {
		return(
			<div>
				<Notify errorMessage={errorMessage} />

				<h2>Login</h2>
				<LoginForm 
					setToken={setToken}
					setError={notify}
				/>
			</div>
		)
	}

	return (
		<div>
			<Notify errorMessage={errorMessage} />
			<button onClick={logout}>Logout</button>
			<Persons persons={result.data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm setError={notify} />
		</div>
	)
}

export default App