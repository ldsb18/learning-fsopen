import axios from "axios"

const blogsUrl = "/api/blogs"
const loginUrl = "/api/login"

export const getBlogs = async () => {
	const response = await axios.get(blogsUrl)
	return response.data
}

export const login = async user => {
	const response = await axios.post(loginUrl, user)
	return response.data
}

export const createBlog = async ({ title, author, url, user }) => {
	const config = {
		headers: { Authorization: `bearer ${user.token}` },
	}

	const response = await axios.post(blogsUrl, { title, author, url }, config)
	return response.data
}

export const updateBlog = async ({ id, updatedBlog, user }) => {
	const config = {
		headers: { Authorization: `bearer ${user.token}` },
	}

	const response = await axios.put(`${blogsUrl}/${id}`, updatedBlog, config)
	return response.data
}

export const deleteBlog = async ({ id, user }) => {
	const config = {
		headers: { Authorization: `bearer ${user.token}` },
	}

	await axios.delete(`${blogsUrl}/${id}`, config)
}
