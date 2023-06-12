import { useDispatch } from "react-redux"
import { NewAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {

    const dispatch = useDispatch

    const addAnecdote = (event) => {
		
		event.preventDefault()
		
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

		dispatch(NewAnecdote(content))
	}

    return (
        <div>
            <form onSubmit={addAnecdote}>
				<div><input name='anecdote' /></div>
				<button type='submit'>create</button>
			</form>
        </div>
    )
}

export default AnecdoteForm