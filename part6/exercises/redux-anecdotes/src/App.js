import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { initiliazeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

	const dispatch = useDispatch()

	useEffect( () => {
		dispatch (initiliazeAnecdotes())
	}, [dispatch])

	return (
		<div>
			<h2>Anecdotes</h2>

			<Notification />
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App