// models/order.js
'use strict'
module.exports = (sequelize, DataTypes) => {
	const OrderStatus = Object.freeze({
		UNPAID: 'не cплачений',
		PAID: 'cплачений',
		IN_TRANSIT: 'в дорозі',
		DELIVERED: 'доставлений',
	})

	return OrderStatus
}
