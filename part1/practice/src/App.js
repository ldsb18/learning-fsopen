import { useState } from 'react'

const Hello = ({name, age}) => {

	const bornYear = () => new Date().getFullYear() - age

	return(  
		<div>
			<p>
				Hello {name}, you are {age} years old
			</p>
			<p>
				So you were probably born in {bornYear()}
			</p>
		</div>
	)
}

const App = () => {
	const name = 'Peter'
	const age = 10

	const [ counter, setCounter ] = useState(0)

	const increaseByOne = () => setCounter(counter + 1)
	const setToZero = () => setCounter(0)

	return(
		<div>

			<div>
				<h1>Greetings</h1>
				<Hello name="Maya" age={26 + 10}/>
				<Hello name={name} age={age}/>
			</div>

			<div>
				{counter}
			</div>

			<button onClick={increaseByOne}>
				plus
			</button>
			<button onClick={setToZero}>
				zero
			</button>

		</div>
	)
}

export default App