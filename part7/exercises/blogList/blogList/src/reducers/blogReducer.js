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
		updateLikes(state, action) {
			return state
				.map(b =>
					b.id === action.payload ? { ...b, likes: b.likes + 1 } : b,
				)
				.sort((a, b) => b.likes - a.likes)
		},
		initialize(state, action) {
			return action.payload
		},
		comment(state,action) {
			return state
				.map(b =>
					b.id === action.payload.id ? action.payload : b,
				)
				.sort((a, b) => b.likes - a.likes)
		}
	},
})

export const { append, erase, updateLikes, initialize, comment } = blogSlice.actions

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
		dispatch(updateLikes(blogId))
	}
}

export const commentBlog = commentedBlog => {
	return async dispatch => {
		dispatch(comment(commentedBlog))
	}
}

export default blogSlice.reducer
