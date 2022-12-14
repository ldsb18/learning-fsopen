require('dotenv').config();
const express =  require('express');
const cors = require('cors');

const Note = require('./models/note');

const app = express();
const PORT =  process.env.PORT || 3001;

let notes = [
	{
		id: 1,
		content: "HTML is easy",
		date: "2022-05-30T17:30:31.098Z",
		important: true  
	},
	{
		id: 2,
		content: "Browser can execute only Javascript",
		date: "2022-05-30T18:39:34.091Z",
		important: false
	},
	{   
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		date: "2022-05-30T19:20:14.298Z",
		important: true
	}
]

/*const generateId = () => {
	const maxId = notes.length > 0
		? Math.max( ...notes.map(n => n.id) )
		: 0

	return maxId + 1;
}*/

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method);
	console.log('Path:', request.path);
	console.log('Body:', request.body);
	console.log('---');
	next();
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({
		error: 'unknown endpoint'
	})
}

const errorHandler = (error, request, response, next) => {
	console.log(error.message, error.name);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id'});
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use(cors())

app.get('/api/notes', (request, response) => {
	Note.find({}).then( _notes => {
		response.json(_notes);
	})
});

app.get('/api/notes/:id', (request, response, next) => {

	Note.findById(request.params.id)
		.then( note => {
			if (note) {
				response.json(note);
			} else {
				response.status(404).end();
			}
		})
		.catch( err => next(err))	
})

app.delete('/api/notes/:id', (request, response) => {
	
	Note.findByIdAndRemove(request.params.id)
		.then( result => {
			response.status(204).end();
		})
		.catch( err => next(err))	
})

app.post('/api/notes', (request, response, next) => {

	const body = request.body;

	if (!body.content) {
		return response.status(400).json({
			error: "content missing"
		})
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
	})

	note.save()
		.then( savedNote => {
			response.json(savedNote)
		})
		.catch( err => next(err))
})

app.put('/api/notes/:id', (request, response, next) => {
	const { content, important } = request.body;

	Note.findByIdAndUpdate(
		request.params.id, 
		{ content, important }, 
		{ new: true, runValidators: true, context: 'query' })
		.then( updatedNote => {
			response.json(updatedNote);
		})
		.catch( err => next(err))
})

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});