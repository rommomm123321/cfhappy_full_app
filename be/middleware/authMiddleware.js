const { verifyToken } = require('../helpers/jwtHelper')

const authenticateJWT = (req, res, next) => {
	const token = req.headers['authorization']?.split(' ')[1]

	if (token) {
		try {
			const user = verifyToken(token)
			req.user = user
			next()
		} catch (err) {
			return res.sendStatus(403)
		}
	} else {
		res.sendStatus(401)
	}
}

module.exports = authenticateJWT
