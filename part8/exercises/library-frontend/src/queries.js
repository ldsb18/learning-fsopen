import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			booksCount
			id
		}
	}
`

export const ALL_AUTHORS_NAME = gql`
	query {
		allAuthors {
			name
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author
			published
		}
	}
`

export const ADD_BOOK = gql`
	mutation createBook(
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			published: $published
			author: $author
			genres: $genres
		) {
			title
			author
			published
			id
		}
	}
`

export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
			booksCount
			id
		}
	}
`
