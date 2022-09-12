import axios from 'axios';

import { useState, useEffect } from 'react';

import Note from './components/Note';

import noteService from './services/notes';

const App = () => {
	const [ notes, setNotes ] = useState([]);
	const [ newNote, setNewNote ] = useState('a new note...');
	const [ showAll, setShowAll ] = useState(true)

	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes);
			})
	}, [])

	const addNote = (event) => {
		event.preventDefault();
		
		const noteObject = {
			content: newNote,
			important: Math.random() < 0.5,
			date: new Date().toISOString()
		}

		noteService
			.create(noteObject)
			.then( createdNote => {
				setNotes(notes.concat(createdNote));
				setNewNote('');
			})
	}

	const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	}

	const toggleImportanceOf = (id) => {
		const note = notes.find(note => note.id === id);
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote)
			.then(updatedNote => {
				setNotes(notes.map(n => n.id !== id ? n : updatedNote));
			})
	}

	const notesToShow = showAll	
		? notes
		: notes.filter(note => note.important)

	return (
		<div>

			<h1>Notes</h1>
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

			<form onSubmit={addNote}>
				<input 
					value={newNote} 
					onChange={handleNoteChange} 
				/>
				<button type='submit'>save</button>
			</form>
		</div>
	);
}

export default App