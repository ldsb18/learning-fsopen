import { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Logout from './components/Logout'
import Togglable from './components/Togglable'

import noteService from './services/notes'

const App = () => {
	const [ notes, setNotes ] = useState([])
	const [ showAll, setShowAll ] = useState(true)
	const [ errorMessage, setErrorMessage ] = useState(null)
	const [ user, setUser ] = useState(null)

	const noteFormRef = useRef()

	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson)
			setUser(user)
			noteService.setToken(user.token)
		}
	}, [])

	const toggleImportanceOf = (id) => {
		const note = notes.find(note => note.id === id)
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote)
			.then(updatedNote => {
				setNotes(notes.map(n => n.id !== id ? n : updatedNote))
			})
			.catch(error => {
				console.log(error)
				setErrorMessage(
					`Note "${note.content}" was already removed from the server`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setNotes(notes.filter(n => n.id !== id))
			})
	}

	const createNote = (newNote) => {
		const noteObject = {
			content: newNote.content,
			important: newNote.important,
			date: new Date().toISOString()
		}

		noteFormRef.current.toogleVisibility()
		noteService
			.create(noteObject)
			.then( createdNote => {
				setNotes(notes.concat(createdNote))
			})
	}

	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important)

	return (
		<div>

			<h1>Notes</h1>

			<Notification message={errorMessage}/>

			{ user === null
				? <Togglable buttonLabel='login'>
					<LoginForm setUserState={setUser} setErrorMessage={setErrorMessage} />
				</Togglable>
				: <div>
					<p>{user.name} logged in</p>
					<Logout setUserState={setUser}/>
					<br />
					<br />
					<Togglable buttonLabel='New note' ref={noteFormRef}>
						<NoteForm createNote={createNote} />
					</Togglable>
				</div>
			}
			<br />
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					Show { showAll ? 'important' : 'all'}
				</button>
			</div>

			<ul>
				{ notesToShow.map(note =>
					<Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id) } />
				)}
			</ul>

			<Footer />
		</div>
	)
}

export default App