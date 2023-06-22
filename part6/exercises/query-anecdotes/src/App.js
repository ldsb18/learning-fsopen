import { useMutation, useQuery, useQueryClient } from 'react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, voteAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {

	const queryClient = useQueryClient()

	const dispatchNotification = useNotificationDispatch()

	const notificationHandler = info => {
		dispatchNotification({ type: 'SET_NOTIF', payload: info})
		setTimeout(() => {
			dispatchNotification({ type: 'SET_NOTIF', payload: ''})
		}, 5000);
	}

	const voteAnecdoteMutation = useMutation(voteAnecdote, {
		onSuccess: updatedAnectode => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.map( anecdote => anecdote.id === updatedAnectode.id ? updatedAnectode : anecdote))
			notificationHandler(`anecdote '${updatedAnectode.content}' voted`)
		}
	})

	const handleVote = (anecdote) => {
		voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})
	}

	const result = useQuery(
		'anecdotes',
		getAnecdotes,
		{
			refetchOnWindowFocus: false,
			retry: false,
		}
	)

	if(result.isLoading) {
		return <div>loading data...</div>
	} else if(result.isError) {
		return <div>anecdote service is not available due to problems in server</div>
	}

	const anecdotes = result.data

	return (
		<div>
			<h3>Anecdote app</h3>
		
			<Notification />
			<AnecdoteForm />
		
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
