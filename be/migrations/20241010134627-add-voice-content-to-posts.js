'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Posts', 'voice_content', {
			type: Sequelize.JSON, // Используем тип JSON для хранения массива ссылок
			allowNull: true, // Поле необязательное
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Posts', 'voice_content')
	},
}
