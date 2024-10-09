// seeders/20231007000000-demo-products.js
'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Products', [
			{
				name: 'Кроссовки для кроссфита',
				description: 'Удобные кроссовки для тренировок и соревнований.',
				price: 2500.0,
				images: JSON.stringify([
					{
						url: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Red+Shoes',
						color: 'red',
					},
					{
						url: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Blue+Shoes',
						color: 'blue',
					},
				]),
				sizes: JSON.stringify(['36', '37', '38', '39', '40']),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Футболка для тренировок',
				description: 'Легкая и дышащая футболка.',
				price: 1200.0,
				images: JSON.stringify([
					{
						url: 'https://via.placeholder.com/150/000000/FFFFFF?text=Black+T-Shirt',
						color: 'black',
					},
					{
						url: 'https://via.placeholder.com/150/FFFFFF/000000?text=White+T-Shirt',
						color: 'white',
					},
				]),
				sizes: JSON.stringify(['S', 'M', 'L']),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Шорты для кроссфита',
				description: 'Удобные шорты для активных тренировок.',
				price: 1500.0,
				images: JSON.stringify([
					{
						url: 'https://via.placeholder.com/150/008000/FFFFFF?text=Green+Shorts',
						color: 'green',
					},
					{
						url: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Red+Shorts',
						color: 'red',
					},
				]),
				sizes: JSON.stringify(['M', 'L', 'XL']),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Ремень для тяжелоатлетов',
				description: 'Ремень для поддержки поясницы во время тренировок.',
				price: 800.0,
				images: JSON.stringify([
					{
						url: 'https://via.placeholder.com/150/000000/FFFFFF?text=Black+Belt',
						color: 'black',
					},
				]),
				sizes: JSON.stringify(['S', 'M', 'L']),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Штанги для кроссфита',
				description: 'Качественные штанги для тренировок.',
				price: 12000.0,
				images: JSON.stringify([
					{
						url: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Red+Barbell',
						color: 'red',
					},
					{
						url: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Blue+Barbell',
						color: 'blue',
					},
				]),
				sizes: JSON.stringify([]), // Без размеров
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		])
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Products', null, {})
	},
}
