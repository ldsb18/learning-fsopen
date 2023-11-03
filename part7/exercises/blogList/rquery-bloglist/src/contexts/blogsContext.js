import { createContext, useContext, useReducer } from "react"

const blogsReducer = (state, action) => {
	switch (action.type) {
		case "INITIALIZE":
			return action.payload
		case "ADD":
			return [...state, action.payload]
		case "DELETE":
			return action
		case "LIKE":
			return action
		default:
			return state
	}
}

const blogsContext = createContext()

export const BlogsContextProvider = props => {
	const [blogs, blogsDispatch] = useReducer(blogsReducer, [])

	return (
		<blogsContext.Provider value={[blogs, blogsDispatch]}>
			{props.children}
		</blogsContext.Provider>
	)
}

export const useBlogsValue = () => {
	const blogsAndDispatch = useContext(blogsContext)
	return blogsAndDispatch[0]
}

export const useBlogsDispatch = () => {
	const blogsAndDispatch = useContext(blogsContext)
	return blogsAndDispatch[1]
}

export default blogsContext
