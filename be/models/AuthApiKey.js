'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class AuthApiKey extends Model {
		static associate(models) {
			AuthApiKey.hasMany(models.Post, {
				foreignKey: 'userId',
				as: 'posts',
			})
			AuthApiKey.hasMany(models.Comment, {
				foreignKey: 'userId',
				as: 'comments',
			})
		}
	}
	AuthApiKey.init(
		{
			key: DataTypes.STRING,
			role: {
				type: DataTypes.ENUM('coach', 'trainee'),
				allowNull: false,
				defaultValue: 'trainee',
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
		},
		{
			sequelize,
			modelName: 'AuthApiKey',
		}
	)
	return AuthApiKey
}
