const { CrossfitTerm } = require('../models')

const getAllCrossfitTerms = async (req, res) => {
	try {
		const crossfitTerm = await CrossfitTerm.findAll()
		res.status(200).json(crossfitTerm)
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving crossfitTerm', error })
	}
}

module.exports = {
	getAllCrossfitTerms,
}
