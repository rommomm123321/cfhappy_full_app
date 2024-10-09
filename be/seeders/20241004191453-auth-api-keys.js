'use strict'

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const keys = [
			{
				key: '424B6EF7552B9357C983A1BECECC9',
				name: 'Тренер',
				role: 'coach',
			},
			{
				key: '5757CB8BBC7A5536D73DA47F1D3DF',
				name: 'Тренер',
				role: 'coach',
			},
			{
				key: '65FE65D68A1491F11529C3B2CE1F8',
				name: 'Тренер',
				role: 'coach',
			},
			{
				key: 'BA95ECE33BE4F796DD9DBF4462E92',
				name: 'default',
				role: 'coach',
			},
			{
				key: 'A3CC168E23DE6D2A6B6A87E6A2E4F',
				name: 'default',
				role: 'coach',
			},
		]

		const hashedKeys = await Promise.all(
			keys.map(async user => {
				const hashedKey = await bcrypt.hash(user.key, 10)
				return { key: hashedKey, name: user.name, role: user.role }
			})
		)

		return queryInterface.bulkInsert(
			'AuthApiKeys',
			hashedKeys.map(({ key, name, role }) => ({
				key,
				name,
				role,
				createdAt: new Date(),
				updatedAt: new Date(),
			})),
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete('AuthApiKeys', null, {})
	},
}
