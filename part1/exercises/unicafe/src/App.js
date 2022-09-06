import { useState } from "react";

const Button = ({ onClick, name }) => {
	return(
		<button onClick={onClick}>{ name }</button>
	)
}


const App = () => {
	
	const [ good , setGood ] = useState(0)
	const [ neutral , setNeutral ] = useState(0)
	const [ bad , setBad ] = useState(0)

	const handleGood = () => {
		setGood(good + 1)
	}

	const handleNeutral= () => {
		setNeutral(neutral + 1)
	}

	const handleBad= () => {
		setBad(bad + 1)
	}

	return (
		<div>
			<h1>Give feedback</h1>
		 
			<Button onClick={handleGood} name="Good" />
			<Button onClick={handleNeutral} name="Neutral" />
			<Button onClick={handleBad} name="Bad" />

			<h1>Statistics</h1>

			<p>Good: {good} </p>
			<p>Neutral: {neutral} </p>
			<p>Bad: {bad} </p>

		</div>    
	)
}

export default App;
