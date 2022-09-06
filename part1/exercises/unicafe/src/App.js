import { useState } from "react";

const Button = ({ onClick, name }) => {
	return(
		<button onClick={onClick}>{ name }</button>
	)
}

const All = ({ feedback }) => {

	const total =  feedback.good + feedback.neutral + feedback.bad

	return(
		<StatisticsLine text="All" value={ total } />
	)
}

const Average = ({ feedback }) => {
	
	const total = feedback.good + feedback.neutral + feedback.bad
	const average = (feedback.good - feedback.bad) / total

	return(
		<StatisticsLine text="Average" value={ average } />
	)
}

const Positive = ({ feedback }) => {

	const total = feedback.good + feedback.neutral + feedback.bad
	const percentaje = feedback.good / total;

	return(
		<StatisticsLine text="Positive" value={ percentaje }  />
	)
}

const Statistics = ({ feedback }) => {

	if( (feedback.good + feedback.neutral + feedback.bad) === 0) {
		return(
			<div>
				<p>No feedback given</p>
			</div>
		)
	}

	return(
		<div>
			<StatisticsLine text="Good" value={feedback.good}/>
			<StatisticsLine text="Neutral" value={feedback.neutral}/>
			<StatisticsLine text="Bad" value={feedback.bad}/>

			<All feedback={ feedback } />
			<Average feedback={ feedback } />
			<Positive feedback={ feedback } />
		</div>
	)
}

const StatisticsLine = ({ text, value}) => {

	return(
		<table>
			<tbody>
				<tr>
					<td>{ text }</td>
					<td>{ value }</td>
				</tr>
			</tbody>
		</table>
	)
}

const App = () => {

	const [ feedback, setFeedback ] = useState({
		good: 0,
		neutral: 0,
		bad: 0
	})

	const handleGood = () => {
		setFeedback({ ...feedback, good: feedback.good + 1 })
	}

	const handleNeutral= () => {
		setFeedback({ ...feedback, neutral: feedback.neutral + 1 })
	}

	const handleBad= () => {
		setFeedback({ ...feedback, bad: feedback.bad + 1 })
	}

	return (
		<div>
			<h1>Give feedback</h1>
		 
			<Button onClick={ handleGood } name="Good" />
			<Button onClick={ handleNeutral } name="Neutral" />
			<Button onClick={ handleBad } name="Bad" />

			<h1>Statistics</h1>
			<Statistics feedback={ feedback } />

		</div>    
	)
}

export default App;
