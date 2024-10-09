const { Op } = require('sequelize')
const { Post, Comment, CrossfitTerm, AuthApiKey } = require('../models')

function linkifyAndTooltipify(text, terms) {
	const termRegex = new RegExp(
		`\\b(${terms.map(term => term.term).join('|')})\\b`,
		'g'
	)

	return text
		.replace(termRegex, matched => {
			const term = terms.find(t => t.term === matched)
			if (term) {
				return `<a href="https://www.youtube.com/results?search_query=${encodeURIComponent(
					matched + ' crossfit'
				)}" title="${
					term.definition
				}" target="_blank" class="tooltip-link">${matched}</a>`
			}
			return matched
		})
		.replace(/\n/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

// Create a new post
const createPost = async (req, res) => {
	const { title, content } = req.body
	const userId = req.user.id // Получаем id пользователя из req.user

	try {
		const terms = await CrossfitTerm.findAll()
		const processedContent = linkifyAndTooltipify(content, terms)
		const post = await Post.create({ title, content: processedContent, userId })
		res.status(201).json(post)
	} catch (error) {
		res.status(500).json({ message: 'Error creating post', error })
	}
}

// Get all posts
const getAllPosts = async (req, res) => {
	const { title, content, page = 1, limit = 10 } = req.query

	// Parse page and limit to integers
	const pageNum = parseInt(page)
	const limitNum = parseInt(limit)

	try {
		const where = {}

		if (title) {
			where.title = {
				[Op.like]: `%${title}%`,
			}
		}

		if (content) {
			where.content = {
				[Op.like]: `%${content}%`,
			}
		}

		const offset = (pageNum - 1) * limitNum

		const { count, rows } = await Post.findAndCountAll({
			where,
			order: [['createdAt', 'DESC']],
			include: [{ model: Comment, as: 'comments' }],
			limit: limitNum,
			offset: offset,
			distinct: true,
		})

		res.status(200).json({
			totalPosts: count,
			totalPages: Math.ceil(count / limitNum), // Use the parsed limit for pages
			currentPage: pageNum,
			posts: rows,
		})
	} catch (error) {
		console.error('Error retrieving posts:', error) // Detailed error logging
		res.status(500).json({ message: 'Error retrieving posts', error })
	}
}

// Get a post by ID
const getPostById = async (req, res) => {
	const { id } = req.params
	const { page = 1, limit = 10 } = req.query // Default to page 1 and limit 10

	try {
		const post = await Post.findByPk(id, {
			include: [
				{
					model: AuthApiKey,
					as: 'user',
					attributes: ['id', 'name', 'role'],
				},
				{
					model: Comment,
					as: 'comments',
					include: [
						{
							model: AuthApiKey,
							as: 'user',
							attributes: ['id', 'name', 'role'],
						},
					],
					order: [['createdAt', 'DESC']],
					limit: limit, // Limit the number of comments
					offset: (page - 1) * limit, // Calculate offset for pagination
				},
			],
		})

		if (!post) {
			return res.status(404).json({ message: 'Post not found' })
		}

		// Count total comments for pagination purposes
		const totalComments = await Comment.count({ where: { postId: id } })
		const totalPages = Math.ceil(totalComments / limit)

		res.status(200).json({ post, totalComments, totalPages })
	} catch (error) {
		console.error('Error retrieving post:', error)
		res.status(500).json({ message: 'Error retrieving post', error })
	}
}

// Update a post
const updatePost = async (req, res) => {
	const { id } = req.params
	const { title, content } = req.body
	try {
		const post = await Post.findByPk(id)
		if (!post) {
			return res.status(404).json({ message: 'Post not found' })
		}
		post.title = title
		post.content = content
		await post.save()
		res.status(200).json(post)
	} catch (error) {
		res.status(500).json({ message: 'Error updating post', error })
	}
}

// Delete a post
const deletePost = async (req, res) => {
	const { id } = req.params
	try {
		const post = await Post.findByPk(id)
		if (!post) {
			return res.status(404).json({ message: 'Post not found' })
		}
		await post.destroy()
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: 'Error deleting post', error })
	}
}

module.exports = {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost,
}
