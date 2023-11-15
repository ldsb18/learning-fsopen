import { useMutation } from "@apollo/client"
import { useState } from "react"

import { EDIT_AUTHOR } from "../queries"

const NewAuthor = () => {
	const [name, setName] = useState("")
	const [born, setBorn] = useState("")

    const [ editAuthor ] = useMutation(EDIT_AUTHOR)

	const editBirth = async event => {
		event.preventDefault()

        editAuthor({
            variables: {name, setBornTo: Number(born)}
        })

		setName("")
		setBorn("")
	}

	return (
		<div>

            <h2>Set birthyear</h2>

			<form onSubmit={editBirth}>
				<div>
					name
					<input
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>

				<div>
					born
					<input
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>

				<button type="submit">update author</button>
			</form>
		</div>
	)
}

export default NewAuthor
