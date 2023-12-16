import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useEffect, useState } from "react"

const Books = props => {

	const [ author, setAuthor ] = useState(null)
	const [ genre, setGenre ] = useState(null)
	const [ books, setBooks ] = useState([])

	const response = useQuery(ALL_BOOKS)

	useEffect(() => {
		if(response.data){
			setBooks(response.data.allBooks)
		}
	}, [response.data])

	if (!props.show) {
		return null
	}

	if (response.loading) {
		return <div>Loading...</div>
	}


	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map(a => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}({a.author.born})</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Books
