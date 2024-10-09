'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Comments', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			postId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Posts',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'AuthApiKeys', // ссылка на таблицу AuthApiKeys
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				allowNull: false,
			},
			content: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			parentId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Comments',
					key: 'id',
				},
				allowNull: true,
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now'),
			},
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Comments')
	},
}
