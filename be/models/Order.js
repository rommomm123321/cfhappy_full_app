// models/order.js
'use strict'

const { Sequelize } = require('.')

module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define(
		'Order',
		{
			data: DataTypes.JSONB,
			status: {
				type: DataTypes.ENUM('UNPAID', 'PAID', 'IN_TRANSIT', 'DELIVERED'),
				defaultValue: 'UNPAID',
				allowNull: false,
			},
		},
		{}
	)

	return Order
}
