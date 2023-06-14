import { createSlice } from "@reduxjs/toolkit"

/* const initialState = [
	{
		content: 'reducer defines how redux store works',
		important: true,
		id: 1,
	},
	{
		content: 'state of store can contain any data',
		important: false,
		id: 2,
	},
] */

//random id number generator
const generateId = () => Number((Math.random() * 1000000).toFixed(0))


const noteSlice = createSlice({
	name: 'notes',
	initialState: [],
	reducers : {
		createNote(state, action) {
			state.push(action.payload)
		},
		toggleImportanceOf(state, action) {
			const id = action.payload
			const noteToChange = state.find(note => note.id === id)
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important
			}

			return state.map( note => note.id === id ? changedNote : note)
		},
		appendNote(state, action) {
			state.push(action.payload)
		},
		setNotes(state, action) {
			return action.payload
		}
	}
})

export const { createNote, toggleImportanceOf, appendNote, setNotes } =  noteSlice.actions
export default noteSlice.reducer