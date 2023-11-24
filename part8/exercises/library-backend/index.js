const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to ', MONGODB_URI)
mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('failed connection to MongoDB', error.message)
	})

const typeDefs = `
	type Author {
		name: String!
		born: String
		booksCount: Int
		id: ID!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]!
		): Book
		editAuthor(
			name: String!
			setBornTo: Int!
		): Author
		createUser(
			username: String!
			favoriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]
		allAuthors: [Author!]!
		me: User
	}
`

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {

			return Book.find({
				...( args.author && { author: await Author.findOne({ name: args.author }) }),
				...( args.genre && { genres: args.genre } )
			}).populate('author')

		},
		allAuthors: async () => Author.find({}),
		me: async (root, args, context) => context.currentUser
	},
	Mutation: {
		addBook: async (root, args, context) => {

			const currentUser = context.currentUser

			if(!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}

			const existingAuthor = await Author.findOne({ name: args.author })

			try {

				if(!existingAuthor) {
					const newAuthor = new Author({ name: args.author })
					
					const newBookAndAuthor = new Book({ ...args, author: newAuthor })
					await newBookAndAuthor.save()
					await newAuthor.save()

					return newBookAndAuthor
				}

				const newBook = new Book({ ...args, author: existingAuthor })
				await newBook.save()

				return newBook

			} catch (exception) {

				throw new GraphQLError('Saving Book failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.title,
						exception
					}
				})

			}


		},
		editAuthor: async (root, args, context) => {

			const currentUser = context.currentUser

			if(!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}

			const authorToUpdate = await Author.findOne({ name: args.name })

			if(!authorToUpdate) {
				return null
			}

			authorToUpdate.born = args.setBornTo
			try {

				await authorToUpdate.save()
				return authorToUpdate

			} catch (exception) {

				throw new GraphQLError('Updating Author failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						exception
					}
				})

			}
		},
		createUser: async (root, args) => {
			const user = new User({ ...args })

			return user.save()
				.catch( error => {
					throw new GraphQLError('Creating the user failed', {
						extensions: {
							code: 'BAD_USER_INPUT',
							invalidArgs: args.username,
							error
						}
					})
				})

		},
		login: async (root, args) => {

			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret' ) {
				throw new GraphQLError('Wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id
			}
			
			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		},
	},
	Author: {
		name: (root) => root.name,
		born: (root) => root.born,
		booksCount: async (root) => {
			const books = await Book.find({ author: root.id })
			return books.length
		},
		id: (root) => root.id,
	},
	Book: {
		title: (root) => root.title,
		published: (root) => root.published,
		author: (root) => root.author,
		genres: (root) => root.genres,
		id: (root) => root.id,
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null

		if( auth && auth.startsWith('bearer ') ) {
			
			const decodedToken = jwt.verify(
				auth.substring(7), process.env.JWT_SECRET
			)

			const currentUser = await User.findById(decodedToken.id)

			return { currentUser }
		}
	}, 
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})