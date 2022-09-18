const notesRouter = require('express').Router()
const Notes = require('../models/note')

notesRouter.get('/', (request, response) => {
	Notes.find({}).then( notes => {
		response.json(notes)
	})
})

notesRouter.get('/:id', (request, response, next) => {
	Notes.findById(request.params.id)
		.then( note => {
			if (note) {
				response.json(note)
			} else {
				response.status(404).end()
			}
		})
		.catch( err => next(err))
})

notesRouter.post('/', (request, response, next) => {
	const body = request.body

	const note = new Notes({
		content: body.content,
		important: body.important || false,
		date: new Date()
	})

	note.save().then( savedNote => {
		response.json(savedNote)
	})
		.catch( err => next(err) )
})

notesRouter.delete('/:id', (request, response, next) => {
	Notes.findByIdAndRemove(request.params.id)
		.then( result => {
			response.status(204).end()
		})
		.catch( err => next(err))
})

notesRouter.put('/:id', (request, response, next) => {
	const body = request.body

	const note = {
		important: body. important,
	}
    
	Notes.findByIdAndUpdate(request.params.id, note, {new: true,})
		.then( updatedNote => {
			response.json(updatedNote)
		})
		.catch( err => next(err))
})

module.exports = notesRouter
