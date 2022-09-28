import { useState } from 'react'

import blogService from '../services/blogs'

const NewBlog = ({ blogs, setBlogsState}) => {

	const [ title, setTitle ] = useState('')
	const [ author, setAuthor ] = useState('')
	const [ url, setUrl ] = useState('')

	const postBlog = async (event) => {
		event.preventDefault()

		try {
			const newBlog = await blogService.post({
				title,
				author,
				url
			})

			setBlogsState( blogs.concat(newBlog) )

		} catch(exception) {
			console.log(exception.message);
		}
	}

	return(
		<div>
			<h2>Create a new Blog</h2>
			<form onSubmit={postBlog}>
				<div>
					Title:
					<input
						type='text'
						value={title}
						name="title"
						onChange={ ({ target }) => setTitle( target.value )}
					/>
				</div>

				<div>
					Author:
					<input
						type='text'
						value={author}
						name="author"
						onChange={ ({ target }) => setAuthor( target.value )}
					/>
				</div>

				<div>
					URL:
					<input
						type='text'
						value={url}
						name="url"
						onChange={ ({ target }) => setUrl( target.value )}
					/>
				</div>

				<button type='submit'>Create</button>
			</form>
		</div>
	)
}

export default NewBlog