import axios from "axios"
const baseUrl = "/api/login"

const login = async user => {
	const response = await axios.post(baseUrl, user)
	return response.data
}

const checkToken = async (token) => {

	const config = {
		headers: { Authorization: `bearer ${token}` },
	}

	const response = await axios.get(`${baseUrl}/verifyToken`, config)
	return response.data
}

// eslint-disable-next-line
export default { login, checkToken }
