// models/Post.js
'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
			Post.belongsTo(models.AuthApiKey, {
				foreignKey: 'userId',
				as: 'user',
			})
			Post.hasMany(models.Comment, {
				foreignKey: 'postId',
				as: 'comments',
			})
		}
	}

	Post.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
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
			voice_content: {
				type: DataTypes.JSONB,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Post',
		}
	)

	return Post
}
