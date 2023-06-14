import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteReducer"
import { eraseNotification, setNotification } from "../reducers/notificationReducer"

import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		
		event.preventDefault()
		
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

		const createdAnecdote = await anecdoteService.createNew(content)

		dispatch(newAnecdote(createdAnecdote))
		dispatch(setNotification(`You added '${content}' anecdote`))
		setTimeout(() => {
			dispatch(eraseNotification())
		}, 5000);
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div><input name='anecdote' /></div>
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm