const notesRouter = require('express').Router()
const Notes = require('../models/note')

notesRouter.get('/', async (request, response) => {
	
	const notes = await Notes.find({})
	response.json(notes)

})

notesRouter.get('/:id', async (request, response, next) => {
	
	const note = await Notes.findById(request.params.id)

	if (note) {
		response.json(note)
	} else {
		response.status(404).end()
	}
	
})

notesRouter.post('/', async (request, response, next) => {
	
	const body = request.body

	const note = new Notes({
		content: body.content,
		important: body.important || false,
		date: new Date()
	})

	const savedNote = await note.save()
	response.status(201).json(savedNote)
	
})

notesRouter.delete('/:id', async (request, response, next) => {

	await Notes.findByIdAndRemove(request.params.id)
	response.status(204).end()

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
