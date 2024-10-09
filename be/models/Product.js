// models/product.js
'use strict'
module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		'Product',
		{
			name: DataTypes.STRING,
			description: DataTypes.TEXT,
			price: DataTypes.FLOAT,
			images: DataTypes.JSONB,
			sizes: DataTypes.JSONB,
		},
		{}
	)

	return Product
}
