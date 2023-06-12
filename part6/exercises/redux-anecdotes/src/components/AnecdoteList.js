import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, handler}) => {
	return(
		<div>
			<div>{ anecdote.content }</div>
			<div>
				has { anecdote.votes } 
				<button onClick={handler}>votes</button>
			</div>
		</div>
	)
}

const AnecdoteList = () => {

	const anecdotes = useSelector( ({anecdotes, filter}) => {
		return anecdotes.filter( anecdote => anecdote.content.toLowerCase().includes( filter.toLowerCase() ))
	})
	
	const dispatch = useDispatch()
	return (
		<div>
			{ anecdotes.map(anecdote =>
				<Anecdote 
					key={ anecdote.id }
					anecdote={ anecdote }
					handler={() => dispatch(voteAnecdote(anecdote.id))}
				/>
			)}
		</div>
	)
}

export default AnecdoteList