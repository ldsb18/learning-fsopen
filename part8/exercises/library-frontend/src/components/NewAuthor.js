import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"

import { ALL_AUTHORS_NAME, EDIT_AUTHOR } from "../queries"

const NewAuthor = () => {
	const [born, setBorn] = useState("")

	const response = useQuery(ALL_AUTHORS_NAME)
	const [editAuthor] = useMutation(EDIT_AUTHOR)

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
