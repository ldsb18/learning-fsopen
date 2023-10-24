import { useEffect, useState } from 'react'

import { Link, Routes, Route, useMatch, useNavigate } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes</h2>
		<ul>
			{anecdotes.map(anecdote => 
				<li key={anecdote.id} >
					<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
				</li>)
			}
		</ul>
	</div>
)

const Anecdote = ({ anec }) => (
	<div>
		<h2>{ anec.content }</h2>
		<p>has { anec.votes } votes</p>
		<p>for more info see <a href={anec.info}>{ anec.info }</a></p>
	</div>
)

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>An anecdote is a brief, revealing account of an individual person or an incident.
			Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
			such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
			An anecdote is "a story with a point."</em>

		<p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
	</div>
)

const Footer = () => (
	<div>
		Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

		See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
	</div>
)

const CreateNew = (props) => {
	const [content, setContent] = useState('')
	const [author, setAuthor] = useState('')
	const [info, setInfo] = useState('')

	const navigate = useNavigate()


	const handleSubmit = (e) => {
		e.preventDefault()
		props.addNew({
			content,
			author,
			info,
			votes: 0
		})
		setAuthor('')
		setContent('')
		setInfo('')
		navigate("/")
	}

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
				</div>
				<div>
					author
					<input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
				</div>
				<div>
					url for more info
					<input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
				</div>
				<button>create</button>
			</form>
		</div>
	)

}

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2
		}
	])

	const [notification, setNotification] = useState('')

	const match = useMatch("/anecdotes/:id")
	const anecdote = match
		? anecdotes.find(a => a.id === Number(match.params.id))
		: null

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000)
		setAnecdotes(anecdotes.concat(anecdote))
		setNotification('Anecdote added')
		setTimeout(() => {
			setNotification('')
		}, 5000);
	}

	const anecdoteById = (id) =>
		anecdotes.find(a => a.id === id)

	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		}

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
	}

	return (
		<div>
			<h1>Software anecdotes</h1>
			
			<div>
				<Link style={{padding: 5}} to="/">anecdotes</Link>
				<Link style={{padding: 5}} to="/create">create new</Link>
				<Link style={{padding: 5}} to="/about">about</Link>
			</div>
			<br />

			{ notification 
				?	<strong><p style={{color: 'green', fontSize: '20px'}}>AN ANECDOTE HAS BEEN ADDED!</p></strong>
				:	null
			}

			<Routes>
				<Route path="/" element={ <AnecdoteList anecdotes={anecdotes} /> } />
				<Route path="/about" element={ <About /> } />
				<Route path="/create" element={ <CreateNew addNew={addNew} /> } />
				<Route path="/anecdotes/:id" element={ <Anecdote anec={anecdote} /> } />
			</Routes>

			<br />
			<Footer />
		</div>
	)
}

export default App
