// migrations/xxxx-create-product.js
'use strict'

const OrderStatus = require('../models/orderStatus')

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Orders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			data: {
				type: Sequelize.JSONB,
				allowNull: false,
			},
			status: {
				type: Sequelize.ENUM('UNPAID', 'PAID', 'IN_TRANSIT', 'DELIVERED'),
				allowNull: false,
				defaultValue: 'UNPAID',
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
		return queryInterface.dropTable('Orders')
	},
}
