const { Comment, CrossfitTerm } = require('../models')

function linkifyAndTooltipify(text, terms) {
	const removeTagRegex = /<p[^>]*data-f-id="pbf"[^>]*>.*?<\/p>/gi

	// Удаление найденных тегов
	let cleanedText = text.replace(removeTagRegex, '')
	const termRegex = new RegExp(
		`\\b(${terms.map(term => term.term).join('|')})\\b`,
		'g'
	)

	cleanedText = cleanedText
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

	return cleanedText
}

// Create a new comment
const createComment = async (req, res) => {
	const { postId, content, parentId } = req.body // parentId for nested comments
	const userId = req.user.id
	try {
		const terms = await CrossfitTerm.findAll()
		const processedContent = linkifyAndTooltipify(content, terms)
		const comment = await Comment.create({
			postId,
			content: processedContent,
			parentId,
			userId,
		})
		res.status(201).json(comment)
	} catch (error) {
		res.status(500).json({ message: 'Error creating comment', error })
	}
}

// Get all comments for a specific post
const getCommentsForPost = async (req, res) => {
	const { postId } = req.params
	try {
		const comments = await Comment.findAll({
			where: { postId },
			include: [{ model: Comment, as: 'replies' }], // Include replies
		})
		res.status(200).json(comments)
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving comments', error })
	}
}

// Get a comment by ID
const getCommentById = async (req, res) => {
	const { id } = req.params
	try {
		const comment = await Comment.findByPk(id, {
			include: [{ model: Comment, as: 'replies' }], // Include replies
		})
		if (!comment) {
			return res.status(404).json({ message: 'Comment not found' })
		}
		res.status(200).json(comment)
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving comment', error })
	}
}

// Update a comment
const updateComment = async (req, res) => {
	const { id } = req.params
	const { content } = req.body
	try {
		const comment = await Comment.findByPk(id)
		if (!comment) {
			return res.status(404).json({ message: 'Comment not found' })
		}
		comment.content = content
		await comment.save()
		res.status(200).json(comment)
	} catch (error) {
		res.status(500).json({ message: 'Error updating comment', error })
	}
}

// Delete a comment
const deleteComment = async (req, res) => {
	const { id } = req.params
	try {
		const comment = await Comment.findByPk(id)
		if (!comment) {
			return res.status(404).json({ message: 'Comment not found' })
		}
		await comment.destroy()
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: 'Error deleting comment', error })
	}
}

module.exports = {
	createComment,
	getCommentsForPost,
	getCommentById,
	updateComment,
	deleteComment,
}
