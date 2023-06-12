import { useDispatch } from "react-redux"
import { createNote } from "../reducers/noteReducer"

const NewNote = () => {

    const dispatch = useDispatch()

    //Function to add a note in the state
	const addNote = (event) => {

		event.preventDefault()

		const content = event.target.note.value
		event.target.note.value = ''

		dispatch(createNote(content))

	}


    return (
        <div>
            <form onSubmit={addNote}>
				<input name="note" />
				<button type="submit">add</button>
			</form>
        </div>
    )
}

export default NewNote