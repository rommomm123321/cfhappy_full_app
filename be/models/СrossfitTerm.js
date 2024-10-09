module.exports = (sequelize, DataTypes) => {
	const CrossfitTerm = sequelize.define('CrossfitTerm', {
		term: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false,
		},
		definition: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
	})

	return CrossfitTerm
}
