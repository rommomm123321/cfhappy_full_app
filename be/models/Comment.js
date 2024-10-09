// models/Comment.js
'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			Comment.belongsTo(models.Post, {
				foreignKey: 'postId',
				as: 'post',
			})
			Comment.belongsTo(models.Comment, {
				foreignKey: 'parentId',
				as: 'parent',
			})
			Comment.hasMany(models.Comment, {
				foreignKey: 'parentId',
				as: 'replies',
			})
			Comment.belongsTo(models.AuthApiKey, {
				foreignKey: 'userId',
				as: 'user',
			})
		}
	}

	Comment.init(
		{
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			postId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			parentId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Comments',
					key: 'id',
				},
				allowNull: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'AuthApiKeys',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
		},
		{
			sequelize,
			modelName: 'Comment',
		}
	)

	return Comment
}
