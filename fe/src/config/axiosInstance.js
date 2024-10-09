import axios from 'axios'

// eslint-disable-next-line no-undef
const baseURL =
	process.env.BE_URL || 'https://cfhappy-full-app.onrender.com/api/posts/api'

const getToken = () => {
	return localStorage.getItem('token') || ''
}

export const axiosInstance = axios.create({
	baseURL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		'Accept-Language': 'en-US,en;q=0.8',
	},
})

axiosInstance.interceptors.request.use(
	config => {
		const token = getToken()
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if (error.response) {
			console.error('Error response:', error.response)

			if (error.response.status === 401) {
				console.error('Unauthorized, logging out...')
				localStorage.removeItem('token')
				localStorage.removeItem('role')
				localStorage.removeItem('user')
				// localStorage.removeItem('cart')
				// window.location.reload()
			}

			if (error.response.status === 403) {
				console.error('Unauthorized, logging out...')
				localStorage.removeItem('token')
				localStorage.removeItem('role')
				localStorage.removeItem('user')
				// localStorage.removeItem('cart')

				// window.location.reload()
			}

			if (error.response.status >= 500) {
				console.error('Server error:', error.response.statusText)
			}
		} else if (error.request) {
			console.error('No response received:', error.request)
		} else {
			console.error('Error setting up the request:', error.message)
		}

		return Promise.reject(error)
	}
)

export default axiosInstance
