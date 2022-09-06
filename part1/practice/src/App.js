import { click } from '@testing-library/user-event/dist/click'
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

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) => (
	<button onClick={onClick}>
		{text}
	</button>
)

const History = (props) => {
	if (props.allClicks.length === 0){
		return (
			<div>
				the app is used by pressing the buttons
			</div>
		)
	}
	
	return(
		<div>
			button press history: {props.allClicks.join(' ')}
		</div>
	)
}

const App = () => {
	const name = 'Peter'
	const age = 10

	const [ counter, setCounter ] = useState(0)

	const [ clicks, setClicks ] = useState({
		left: 0, right: 0
	})

	const [ allClicks , setAll] = useState([])

	const increaseByOne = () => setCounter(counter + 1)
	const decreaseByOne = () => setCounter(counter - 1)
	const setToZero = () => setCounter(0)

	const handleLeftClick = () => {
		setAll(allClicks.concat('L'))
		setClicks({ ...clicks, left: clicks.left + 1 })
	}

	const handleRightClick = () => {
		setAll(allClicks.concat('R'))
		setClicks({ ...clicks, right: clicks.right + 1 })
	}

	return(
		<div>

			<div>
				<h1>Greetings</h1>
				<Hello name="Maya" age={26 + 10}/>
				<Hello name={name} age={age}/>
			</div>

			<div>
				<Display counter={counter} />
				<Button onClick={increaseByOne} text="plus" />
				<Button onClick={decreaseByOne} text="minus" />
				<Button onClick={setToZero} text="zero" />
			</div>

			<br/>

			<div>
				{clicks.left}
				<Button onClick={handleLeftClick} text="Left"/>
				<Button onClick={handleRightClick} text="Right"/>
				{clicks.right}

				<History allClicks={allClicks} />
			</div>
		</div>
	)
}

export default App