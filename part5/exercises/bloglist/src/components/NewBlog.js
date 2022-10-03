import { useState } from 'react'

const NewBlog = ({ newBlog }) => {

	const [ title, setTitle ] = useState('')
	const [ author, setAuthor ] = useState('')
	const [ url, setUrl ] = useState('')

	const postBlog = (event) => {
		event.preventDefault()

		const blogsToPost = {
			title, 
			author, 
			url
		}

		newBlog( blogsToPost )
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
						placeholder='title'
						onChange={ ({ target }) => setTitle( target.value )}
					/>
				</div>

				<div>
					Author:
					<input
						type='text'
						value={author}
						name="author"
						placeholder='author'
						onChange={ ({ target }) => setAuthor( target.value )}
					/>
				</div>

				<div>
					URL:
					<input
						type='text'
						value={url}
						name="url"
						placeholder='url'
						onChange={ ({ target }) => setUrl( target.value )}
					/>
				</div>

				<button type='submit' className='submitButton'>Create</button>
			</form>
		</div>
	)
}

export default NewBlog