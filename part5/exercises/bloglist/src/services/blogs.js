import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const post = async (newBlog) => {
    const config = {
        headers:  {Authorization: token }
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const put = async (id, updatedBlog) => {
    const config = {
        headers: {Authorization: token}
    }

    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
    return response.data
}

export default { setToken, getAll, post, put }