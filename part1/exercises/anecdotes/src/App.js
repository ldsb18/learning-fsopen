import { useState } from "react";

const Button = ({ onClick, text }) => {
	return( 
		<button onClick={onClick}>
			{ text }
		</button>
	)
}

const Anecdote = ({ anecdotes }) => {

	const [selected, setSelected] = useState(0)

	const [votes, setVotes ] = useState(new Array(anecdotes.length).fill(0))

	const randomNumberWithRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const randomAnecdote = () => {
		setSelected(randomNumberWithRange(0, anecdotes.length - 1));
	}

	const handleVote = () => {
		const selectedAnecdote = selected;

		const copyVotes = [...votes]

		copyVotes[selectedAnecdote] += 1;

		setVotes(copyVotes)
	}

	return(
		<div>
			<h1>Anecdote of the day</h1>

			<p>{ anecdotes[selected] }</p>
			<p>Has { votes[selected] } votes</p>

			<Button onClick={handleVote} text="Vote" />
			<Button onClick={randomAnecdote} text="Next anecdote" />

			<h1>Most voted anecdote</h1>

			<MostVoted anecdotes={anecdotes} votes={votes} />
		</div>
	)
}

const MostVoted = ({ anecdotes, votes }) => {

	const pickMostVoted = (votes) => {
		let mostVoted = {
			index: 0,
			value: 0
		};

		votes.forEach((element, index) => {
			if(element > mostVoted.value){
				mostVoted.value = element;
				mostVoted.index = index;
			}
		});

		return mostVoted.index
	}

	return(
		<div>
			<p> { anecdotes[pickMostVoted(votes)] } </p>
		</div>
	)
}

const App = () => {

	const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

	return (
		<Anecdote anecdotes={anecdotes} />
	);
}

export default App;
