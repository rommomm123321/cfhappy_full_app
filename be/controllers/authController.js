const bcrypt = require('bcrypt')
const { AuthApiKey } = require('../models')
const { generateToken, verifyToken } = require('../helpers/jwtHelper')

const authenticateUser = async (req, res) => {
	const { key, name } = req.body
	try {
		const apiKeys = await AuthApiKey.findAll()

		const apiKeyRecord = apiKeys.find(apiKey => {
			return bcrypt.compareSync(key, apiKey.key)
		})

		if (!apiKeyRecord) {
			return res.status(403).json({ message: 'Invalid API key' })
		}

		const isValid = await bcrypt.compare(key, apiKeyRecord.key)

		if (isValid) {
			if (apiKeyRecord.name !== name) {
				await apiKeyRecord.update({ name })
			}
			const token = generateToken(apiKeyRecord)
			res.status(200).json({ token })
		} else {
			res.status(403).json({ message: 'Invalid API key' })
		}
	} catch (error) {
		if (!key || !name) {
			return res.status(403).json({ message: 'The API key cannot be empty ' })
		} else {
			res.status(500).json({ message: 'Server error', error })
		}
	}
}

const getMe = async (req, res) => {
	try {
		const userId = req.user.id

		if (!userId) {
			return res.status(403).json({ message: 'Invalid token' })
		}

		const apiKeyRecord = await AuthApiKey.findByPk(userId)

		if (!apiKeyRecord) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.status(200).json({
			id: apiKeyRecord.id,
			name: apiKeyRecord.name,
			role: apiKeyRecord.role,
			createdAt: apiKeyRecord.createdAt,
			updatedAt: apiKeyRecord.updatedAt,
			exist: true,
		})
	} catch (error) {
		console.error('Error in getMe function:', error)
		res.status(500).json({ message: 'Server error', error })
	}
}

module.exports = {
	authenticateUser,
	getMe,
}
