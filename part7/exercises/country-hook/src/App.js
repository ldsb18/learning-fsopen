import React, { useState, useEffect } from 'react'
import axios from 'axios'

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange
	}
}

const useCountry = (name) => {
	const [country, setCountry] = useState(null)

	const fetchCountry = async (n) => {
		const URL = `${baseURL}/name/${n}`
		const response = await axios.get(URL)
		console.log(response.data);
		return response.data
	}

	const fetch = async (n) => {
		if(n !== '') {
			try{
				const {name, capital, population, flags} = await fetchCountry(n)

				const result = {found: 1, data: {name, capital, population, flags}}

				setCountry(result)
				//console.log(result);
			} catch (e) {
				setCountry(e);
			}
		}
	}

	useEffect(() => {
			fetch(name)
	}, [name])

	return country
}

const Country = ({ country }) => {
	if (!country) {
		return null
	}

	if (!country.found) {
		return (
			<div>
				not found...
			</div>
		)
	}

	return (
		<div>
			<h3>{country.data.name.official} </h3>
			<div>capital {country.data.capital} </div>
			<div>population {country.data.population}</div> 
			<img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.official}`}/>  
		</div>
	)
}

const App = () => {
	const nameInput = useField('text')
	const [name, setName] = useState('')
	const country = useCountry(name)

	const fetch = (e) => {
		e.preventDefault()
		setName(nameInput.value)
	}

	return (
		<div>
			<form onSubmit={fetch}>
				<input style={ {margin: 3} } {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country} />
		</div>
	)
}

export default App