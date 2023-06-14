import { createSlice } from "@reduxjs/toolkit"

import anecdoteService from '../services/anecdotes'

// PART OF PREVIOUS SERVERLESS IMPLEMENTATION :
/* const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

const initialState = anecdotesAtStart.map(asObject) */

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		newAnecdote(store, action) {
			store.push( action.payload )
		},
		changeAnecdote(store, action) {
			return store.map( anecdote => anecdote.id === action.payload.id ? action.payload : anecdote).sort( (a, b) => b.votes - a.votes )
		}, 
		setAnecdotes(state, action) {
			return action.payload.sort( (a, b) => b.votes - a.votes )
		}
	}
})

export const { newAnecdote, setAnecdotes, changeAnecdote } = anecdoteSlice.actions

export const initiliazeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch( setAnecdotes( anecdotes ) )
	}
}

export const createNew = ( content ) => {
	return async dispatch => {
		const createdAnecdote = await anecdoteService.createNew( content )
		dispatch( newAnecdote( createdAnecdote ) )
	}
}

export const voteAnecdote = ( anecdote ) => {
	return async dispatch => {		
			const changedAnecdote = {
				...anecdote,
				votes: anecdote.votes + 1
			}

			const updatedAnecdote = await anecdoteService.update( anecdote.id, changedAnecdote)

			dispatch(changeAnecdote( updatedAnecdote ))
	   }
}


export default anecdoteSlice.reducer