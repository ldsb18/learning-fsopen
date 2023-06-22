import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
	axios.get(baseUrl).then( res => res.data )

export const newAnecdote = anecdote => 
	axios.post(baseUrl, anecdote).then(res => res.data) //without catch this shows an error on console, with a catch the mutation is succeded

export const voteAnecdote = updatedAnecdote => 
	axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then( res => res.data )