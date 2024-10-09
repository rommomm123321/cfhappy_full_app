module.exports = (sequelize, DataTypes) => {
	const CrossfitTerm = sequelize.define('CrossfitTerm', {
		term: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		definition: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	})

	return CrossfitTerm
}
