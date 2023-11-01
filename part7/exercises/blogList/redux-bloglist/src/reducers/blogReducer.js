import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        append(state, action){
            return state.concat(action.payload)
        },
        erase(state, action){
            return state
        },
        update(state, action){
            return state
        },
        initialize(state, action) {
            return action.payload
        }
    },
})

export const { append, erase, update, initialize } = blogSlice.actions

export const initializeBlogs = (blogs) => {
    return async dispatch => {
        dispatch(initialize(blogs))
    }
}

export const setBlogs = (blogs) => {
    return async dispatch => {
        dispatch(append(blogs))
    }
}

export const deleteBlog = (blog) => {
    return blog
}

export const likeBlog = (blog) => {
    return async dispatch => {
        dispatch(update(blog))
    }
}

export default blogSlice.reducer