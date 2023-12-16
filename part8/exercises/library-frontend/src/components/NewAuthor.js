import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"

import { ALL_AUTHORS, ALL_AUTHORS_NAME, ALL_BOOKS, EDIT_AUTHOR } from "../queries"

// the name "NewAuthor" is not very descriptive, this component change "Born Year" of authors, so the name is very outdated
const NewAuthor = () => {
	const [born, setBorn] = useState("")

	const response = useQuery(ALL_AUTHORS_NAME)
	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
	})

	const editBirth = async event => {
		event.preventDefault()
		const [value] = new FormData(event.target)

		editAuthor({
			variables: { name: value[1], setBornTo: Number(born) },
		})

		setBorn("")
	}

	const authors = response.data.allAuthors

	return (
		<div>
			<h2>Set birthyear</h2>

			<form onSubmit={editBirth}>
				<label>
					Pick some dude:
					<select name="author">
						{authors.map(a => (
							<option value={a.name} key={a.name}>
								{" "}
								{a.name}{" "}
							</option>
						))}
					</select>
				</label>
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
