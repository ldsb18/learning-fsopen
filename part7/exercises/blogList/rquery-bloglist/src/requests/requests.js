import axios from "axios"

const blogsUrl = "/api/blogs"
const loginUrl = "/api/login"

export const getBlogs = async () => {
	const response = await axios.get(blogsUrl)
	return response.data
}

export const createBlog = async newBlog => {
	const loggedUser = window.localStorage.getItem("loggedUser")
	const user = JSON.parse(loggedUser)
	const token = `bearer ${user.token}`

	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(blogsUrl, newBlog, config)
	return response.data
}

export const updateBlog = async (id, updatedBlog) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.put(`${blogsUrl}/${id}`, updatedBlog, config)
	return response.data
}

export const deleteBlog = async id => {
	const config = {
		headers: { Authorization: token },
	}

	await axios.delete(`${blogsUrl}/${id}`, config)
}

export const login = async user => {
	const response = await axios.post(loginUrl, user)
	return response.data
}
