import dayjs from 'dayjs'
import axiosInstance from './axiosInstance'

export const fetchPosts = async (
	page = 1,
	limit = 10,
	title = '',
	content = ''
) => {
	try {
		const res = await axiosInstance.get('/posts', {
			params: { page, limit, title, content },
		})
		return res.data
	} catch (error) {
		console.error('Error fetching posts:', error)
		throw error
	}
}

export const fetchProducts = async (page = 1, limit = 10) => {
	try {
		const res = await axiosInstance.get('/products', {
			params: { page, limit },
		})
		return res.data
	} catch (error) {
		console.error('Error fetching posts:', error)
		throw error
	}
}

export const addProduct = async data => {
	try {
		const res = await axiosInstance.post('/products', {
			data,
		})
		return res
	} catch (error) {
		console.error('Error sending content:', error)
		throw error
	}
}

export const updateProduct = async (id, data) => {
	try {
		await axiosInstance.put(`/products/${id}`, data)
	} catch (error) {
		console.error('Error updating content:', error)
		throw error
	}
}

export const deleteProduct = async id => {
	try {
		await axiosInstance.delete(`/products/${id}`, {})
	} catch (error) {
		console.error('Error deleting content:', error)
		throw error
	}
}

export const fetchPost = async (id, page = 1, limit = 10) => {
	try {
		const res = await axiosInstance.get(`/posts/${id}`, {
			params: { page, limit },
		})
		return res.data
	} catch (error) {
		console.error('Error fetching posts:', error)
		throw error
	}
}

export const sendPost = async content => {
	try {
		await axiosInstance.post('/posts', {
			title: dayjs().format().toString(),
			content,
		})
	} catch (error) {
		console.error('Error sending content:', error)
		throw error
	}
}

export const updatePost = async (content, title, id) => {
	try {
		await axiosInstance.put(`/posts/${id}`, {
			title,
			content,
		})
	} catch (error) {
		console.error('Error updating content:', error)
		throw error
	}
}

export const deletePost = async id => {
	try {
		await axiosInstance.delete(`/posts/${id}`, {})
	} catch (error) {
		console.error('Error deleting content:', error)
		throw error
	}
}

export const sendComment = async (content, id) => {
	try {
		await axiosInstance.post('/comments', {
			postId: id,
			content,
		})
	} catch (error) {
		console.error('Error sending content:', error)
		throw error
	}
}

export const updateComment = async (content, id) => {
	try {
		await axiosInstance.put(`/comments/${id}`, {
			content,
		})
	} catch (error) {
		console.error('Error updating content:', error)
		throw error
	}
}

export const deleteComment = async id => {
	try {
		await axiosInstance.delete(`/comments/${id}`, {})
	} catch (error) {
		console.error('Error deleting content:', error)
		throw error
	}
}

export const getToken = async (key, name) => {
	try {
		const data = await axiosInstance.post('/auth', {
			key,
			name,
		})
		localStorage.setItem('token', data.data.token)
		return data
	} catch (error) {
		console.error('Error sending auth:', error)
		throw error
	}
}

export const getMe = async () => {
	try {
		const { data } = await axiosInstance.post('/me')
		localStorage.setItem('user', JSON.stringify(data))
	} catch (error) {
		console.error('Error sending auth:', error)
		throw error
	}
}

export const sendOrder = async data => {
	try {
		const res = await axiosInstance.post('/order', { orderData: data })
		return res
	} catch (error) {
		console.error('Error sending content:', error)
		throw error
	}
}

export const getCurrentUser = () => {
	const user = localStorage.getItem('user')
	return user ? JSON.parse(user) : null
}

export const getCart = () => {
	const cart = localStorage.getItem('cart')
	return cart ? JSON.parse(cart) : null
}
