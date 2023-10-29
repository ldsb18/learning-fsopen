import React, { useEffect, useState } from "react"
import axios from 'axios'

const useNotes = (baseUrl) => {
	const [notes, setNotes] = useState([])

	useEffect(() => {
		axios.get(baseUrl).then(response => {
			setNotes(response.data)
		})
	}, [baseUrl])

	return notes
}


const App = () => {

	const [counter, setCounter] = useState(0)
	const [values, setValues] = useState([])
	const notes = useNotes(BACKEND_URL)

	const handleClick = () => {
		setCounter(counter + 1)
		setValues(values.concat(counter))
	}

	return (
		<div className="container">
			Hello Webpack { counter } clicks
			<button onClick={handleClick}>press</button>
			<div>{notes.length} notes on server {BACKEND_URL} </div>
		</div>
	)
}

export default App