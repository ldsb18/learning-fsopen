import { useState } from 'react'

import noteService from '../services/notes'

const NoteForm = ({ setNotesState, notesState }) => {
    const [ newNote, setNewNote ] = useState('');


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
				setNotesState(notesState.concat(createdNote));
				setNewNote('');
			})
	}


    const handleNoteChange = (event) => {
		setNewNote(event.target.value);
	}
    
    
    return (
        <form onSubmit={addNote}>

            <input 
                value={newNote} 
                onChange={handleNoteChange} 
            />

            <button type='submit'>save</button>
        </form>
    )
}

export default NoteForm