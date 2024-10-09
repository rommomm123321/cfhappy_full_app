// controllers/productController.js
const { Product } = require('../models')

// Create a new product
const createProduct = async (req, res) => {
	const { name, description, price, images, sizes } = req.body.data

	if (req.user.role !== 'coach') {
		return res
			.status(403)
			.json({ message: 'Access denied. Only coaches can create products.' })
	}
	try {
		const product = await Product.create({
			name,
			description,
			price,
			images,
			sizes,
		})
		res.status(201).json(product)
	} catch (error) {
		console.log('error :>> ', error)
		res.status(500).json({ message: 'Error creating product', error })
	}
}

// Get all products
const getAllProducts = async (req, res) => {
	const page = parseInt(req.query.page) || 1
	const limit = parseInt(req.query.limit) || 10
	const offset = (page - 1) * limit

	try {
		const { count, rows } = await Product.findAndCountAll({
			limit,
			offset,
			order: [['createdAt', 'DESC']],
			distinct: true,
		})

		res.status(200).json({
			totalItems: count,
			totalPages: Math.ceil(count / limit),
			currentPage: page,
			products: rows,
		})
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving products', error })
	}
}

// Get a product by ID
const getProductById = async (req, res) => {
	const { id } = req.params
	try {
		const product = await Product.findByPk(id)
		if (!product) {
			return res.status(404).json({ message: 'Product not found' })
		}
		res.status(200).json(product)
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving product', error })
	}
}

// Update a product
const updateProduct = async (req, res) => {
	const { id } = req.params
	const { name, description, price, images, sizes } = req.body

	if (req.user.role !== 'coach') {
		return res
			.status(403)
			.json({ message: 'Access denied. Only coaches can create products.' })
	}

	try {
		const product = await Product.findByPk(id)
		if (!product) {
			return res.status(404).json({ message: 'Product not found' })
		}
		product.name = name
		product.description = description
		product.price = price
		product.images = images
		product.sizes = sizes
		await product.save()
		res.status(200).json(product)
	} catch (error) {
		res.status(500).json({ message: 'Error updating product', error })
	}
}

// Delete a product
const deleteProduct = async (req, res) => {
	const { id } = req.params
	try {
		const product = await Product.findByPk(id)
		if (!product) {
			return res.status(404).json({ message: 'Product not found' })
		}
		await product.destroy()
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: 'Error deleting product', error })
	}
}

module.exports = {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
}
