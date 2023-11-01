import { createSlice } from "@reduxjs/toolkit"

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		append(state, action) {
			return state.concat(action.payload)
		},
		erase(state, action) {
			return state.filter(b => b.id !== action.payload.id)
		},
		update(state, action) {
			return state
				.map(b =>
					b.id === action.payload ? { ...b, likes: b.likes + 1 } : b,
				)
				.sort((a, b) => b.likes - a.likes)
		},
		initialize(state, action) {
			return action.payload
		},
	},
})

export const { append, erase, update, initialize } = blogSlice.actions

export const initializeBlogs = blogs => {
	return async dispatch => {
		dispatch(initialize(blogs))
	}
}

export const setBlogs = blogs => {
	return async dispatch => {
		dispatch(append(blogs))
	}
}

export const deleteBlog = blog => {
	return async dispatch => {
		dispatch(erase(blog))
	}
}

export const likeBlog = blogId => {
	return async dispatch => {
		dispatch(update(blogId))
	}
}

export default blogSlice.reducer
