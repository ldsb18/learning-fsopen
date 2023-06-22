import { useMutation, useQueryClient } from "react-query"
import { newAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {

	const queryClient = useQueryClient()

	const dispatchNotification = useNotificationDispatch()

	const notificationHandler = info => {
		dispatchNotification({ type: 'SET_NOTIF', payload: info})
		setTimeout(() => {
			dispatchNotification({ type: 'SET_NOTIF', payload: ''})
		}, 5000);
	}

	const newAnecdoteMutation = useMutation(newAnecdote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
			notificationHandler(`anecdote '${newAnecdote.content}' has been added`)
		}
	})

	const onCreate = (event) => {
		event.preventDefault()

		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

		newAnecdoteMutation.mutate({ content, votes: 0 })
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type="submit">create</button>
			</form>
			<br/>
		</div>
	)
}

export default AnecdoteForm
