import { useDispatch } from "react-redux"
import { createNew } from "../reducers/anecdoteReducer"
import { eraseNotification, setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		
		event.preventDefault()
		
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

		dispatch( createNew( content ) )

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