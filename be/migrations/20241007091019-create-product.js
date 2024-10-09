// migrations/xxxx-create-product.js
'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			images: {
				type: Sequelize.JSONB,
				allowNull: false,
			},
			sizes: {
				type: Sequelize.JSONB,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Products')
	},
}
