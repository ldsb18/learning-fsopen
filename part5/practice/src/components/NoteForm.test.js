import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import NoteForm from './NoteForm'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
	const createNote = jest.fn()
	const user = userEvent.setup()

	render(<NoteForm />)
})