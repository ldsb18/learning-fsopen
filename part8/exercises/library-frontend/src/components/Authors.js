import { useQuery } from "@apollo/client"

import { ALL_AUTHORS } from "../queries"
import NewAuthor from "./NewAuthor"

const Authors = props => {
	const response = useQuery(ALL_AUTHORS)

	if (!props.show) {
		return null
	}

	if (response.loading) {
		return <div>Loading...</div>
	}

	const authors = response.data.allAuthors

	return (
		<div>
			<h2>authors</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map(a => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.booksCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<NewAuthor />
		</div>
	)
}

export default Authors
