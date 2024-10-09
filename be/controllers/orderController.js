const { Order } = require('../models')
const TelegramBot = require('node-telegram-bot-api')
const OrderStatus = require('../models/orderStatus')
const { Sequelize, Op } = require('sequelize')

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.CHAT_ID

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true })

const colorOptions = {
	'#FF0000': { title: 'Червоний' }, // Red
	'#008000': { title: 'Зелений' }, // Green
	'#0000FF': { title: 'Синій' }, // Blue
	'#FFFF00': { title: 'Жовтий' }, // Yellow
	'#000000': { title: 'Чорний' }, // Black
	'#FFFFFF': { title: 'Білий' }, // White
	'#808080': { title: 'Сірий' }, // Gray
	'#808000': { title: 'Оливковий' }, // Olive
	'#FFA500': { title: 'Помаранчевий' }, // Orange
	'#00BFFF': { title: 'Блакитний' }, // Light Blue
	'#800080': { title: 'Фіолетовий' }, // Purple
	'#00008B': { title: 'Темно-синій' }, // Dark Blue
	'#800000': { title: 'Бордовий' }, // Maroon
	'#006400': { title: 'Темно-зелений' }, // Dark Green
	'#39FF14': { title: 'Неоновий зелений' }, // Neon Green
}

const paidStatus = {
	UNPAID: { status: 'Не cплачений' },
	PAID: { status: 'Сплачений' },
	IN_TRANSIT: { status: 'В дорозі' },
	DELIVERED: { status: 'Доставлений' },
}

bot.onText(/\/start/, msg => {
	const chatId = msg.chat.id

	// Отправка приветственного сообщения с кнопками
	bot.sendMessage(chatId, '👋 Ласкаво просимо! Виберіть один із варіантів:', {
		reply_markup: {
			keyboard: [
				[
					{ text: '📋 Переглянути замовлення (/list_orders)' },
					{ text: '🔍 Фільтрувати замовлення (/filter_orders)' },
				],
			],
			resize_keyboard: true,
			one_time_keyboard: false, // Установите в false, чтобы кнопки не исчезали
		},
	})
})

bot.onText(/\/filter_orders/, async msg => {
	const chatId = msg.chat.id

	// Параметры фильтрации
	const filterButtons = [
		[
			{ text: 'Не сплачений', callback_data: 'filter-UNPAID' },
			{ text: 'Сплачений', callback_data: 'filter-PAID' },
		],
		[
			{ text: 'В дорозі', callback_data: 'filter-IN_TRANSIT' },
			{ text: 'Доставлений', callback_data: 'filter-DELIVERED' },
		],
		[{ text: 'За покупцем', callback_data: 'BY_BUYER' }],
	]

	bot.sendMessage(chatId, 'Виберіть статус для фільтрації:', {
		reply_markup: {
			inline_keyboard: filterButtons,
		},
	})
})

bot.on('callback_query', async query => {
	const chatId = query.message.chat.id
	const [action, _status] = query.data.split('-')
	if (query.data === 'BY_BUYER') {
		bot.sendMessage(
			chatId,
			'Введіть адресу Telegram або номер телефону покупця для фільтрації:'
		)
		bot.on('message', async msg => {
			const buyerInput = msg.text
			// Обработаем ввод пользователя
			try {
				const orders = await Order.findAll({
					where: {
						data: {
							// Используем Op.contains для поиска по вложенному объекту
							[Op.contains]: {
								orderData: {
									telegramAddress: buyerInput,
								},
							},
						},
					},
				})

				if (orders.length === 0) {
					bot.sendMessage(chatId, 'Замовлень не знайдено для цього покупця.')
					return
				}

				const orderButtons = orders.map(order => {
					return [
						{
							text: `Замовлення ID ${order.id}`,
							callback_data: `select_order-${order.id}`,
						},
					]
				})

				bot.sendMessage(chatId, 'Виберіть замовлення:', {
					reply_markup: {
						inline_keyboard: orderButtons,
					},
				})
			} catch (error) {
				console.error('Error fetching orders by buyer:', error)
				bot.sendMessage(chatId, 'Сталася помилка при отриманні замовлень.')
			}
		})
	}

	if (action === 'filter') {
		try {
			const orders = await Order.findAll({
				where: { status: _status },
			})

			if (orders.length === 0) {
				bot.sendMessage(chatId, 'Замовлень не знайдено з цим статусом.')
				return
			}

			const orderButtons = orders.map(order => {
				return [
					{
						text: `Замовлення ID ${order.id}`,
						callback_data: `select_order-${order.id}`,
					},
				]
			})

			bot.sendMessage(chatId, 'Виберіть замовлення:', {
				reply_markup: {
					inline_keyboard: orderButtons,
				},
			})
		} catch (error) {
			console.error('Error fetching filtered orders:', error)
			bot.sendMessage(chatId, 'Сталася помилка при отриманні замовлень.')
		}
	}

	// Обработчик для возврата в главное меню
	if (action === 'back_to_main') {
		bot.sendMessage(
			chatId,
			'🔙 Повертаємось до головного меню. Ви можете обрати один із варіантів нижче:',
			{
				reply_markup: {
					keyboard: [
						[
							{ text: '📋 Переглянути замовлення (/list_orders)' },
							{ text: '🔍 Фільтрувати замовлення (/filter_orders)' },
						],
					],
					resize_keyboard: true,
				},
			}
		)
	}
})

bot.on('message', msg => {
	const chatId = msg.chat.id

	if (msg.text === '📋 Переглянути замовлення (/list_orders)') {
		bot.sendMessage(chatId, '/list_orders')
	} else if (msg.text === '🔍 Фільтрувати замовлення (/filter_orders)') {
		bot.sendMessage(chatId, '/filter_orders')
	}
})

bot.onText(/\/list_orders/, async msg => {
	const chatId = msg.chat.id

	try {
		const orders = await Order.findAll() // Получить все заказы
		if (orders.length === 0) {
			bot.sendMessage(chatId, 'Замовлень немає.')
			return
		}

		const orderButtons = orders.map(order => {
			return [
				{
					text: `Замовлення ID ${order.id}`,
					callback_data: `select_order-${order.id}`,
				},
			]
		})

		bot.sendMessage(chatId, 'Виберіть замовлення:', {
			reply_markup: {
				inline_keyboard: orderButtons,
			},
		})
	} catch (error) {
		console.error('Error fetching orders:', error)
		bot.sendMessage(chatId, 'Сталася помилка при отриманні замовлень.')
	}
})

// Обработка выбора заказа
bot.on('callback_query', async query => {
	const chatId = query.message.chat.id
	const [action, orderId, newStatus] = query.data.split('-')
	console.log('action :>> ', action)
	try {
		if (action === 'select_order') {
			const order = await Order.findByPk(orderId)
			if (!order) {
				bot.sendMessage(chatId, `Замовлення з ID ${orderId} не знайдено.`)
				return
			}

			// Форматируем сообщение с деталями заказа
			const orderItems = order.data.orderData.order
				.map(item => {
					return (
						`*Назва:* ${item.name}\n` +
						`*Розмір:* ${item.size}\n` +
						`*Колір:* ${
							colorOptions[item.color]?.title || 'Невідомий колір'
						}\n` +
						`*Кількість:* ${item.count}\n` +
						`*Ціна:* ${item.price} грн\n` +
						`*Зображення:* ${item.image}\n` // Для отображения ссылки
					)
				})
				.join('\n')

			const statusButtons = Object.keys(paidStatus).map(statusKey => {
				return [
					{
						text: paidStatus[statusKey].status,
						callback_data: `change_status-${orderId}-${statusKey}`,
					},
				]
			})

			// Отправляем информацию о заказе
			bot.sendMessage(
				chatId,
				`*Замовлення ID ${orderId}*\n` +
					`*Статус:* ${paidStatus[order.status].status}\n` +
					`*Дата створення:* ${order.createdAt.toLocaleDateString()} ${order.createdAt.toLocaleTimeString()}\n` +
					`*Телеграм або номер телефону:* ${order.data.orderData.telegramAddress}\n` +
					`*Загальна вартість:* ${calculateTotalPrice(
						order.data.orderData.order
					)} грн\n` +
					`*Деталі замовлення:*\n` +
					`${orderItems}`,
				{
					reply_markup: {
						inline_keyboard: statusButtons,
					},
					parse_mode: 'Markdown',
				}
			)
		} else if (action === 'change_status') {
			// Изменение статуса заказа
			const updatedOrder = await Order.update(
				{ status: newStatus },
				{ where: { id: orderId } }
			)

			if (updatedOrder[0] === 0) {
				bot.sendMessage(chatId, `Замовлення з ID ${orderId} не знайдено.`)
				return
			}

			// Fetch the updated order details
			const updatedOrderDetails = await Order.findByPk(orderId)
			if (!updatedOrderDetails) {
				bot.sendMessage(chatId, `Замовлення з ID ${orderId} не знайдено.`)
				return
			}

			// Get the order items for the updated order
			const orderItems = updatedOrderDetails.data.orderData.order
				.map(item => {
					return (
						`*Назва:* ${item.name}\n` +
						`*Розмір:* ${item.size}\n` +
						`*Колір:* ${
							colorOptions[item.color]?.title || 'Невідомий колір'
						}\n` +
						`*Кількість:* ${item.count}\n` +
						`*Ціна:* ${item.price} грн\n` +
						`*Зображення:* ${item.image}\n` // Это для отображения ссылки
					)
				})
				.join('\n')

			// Отправляем обновленный статус
			bot.sendMessage(
				chatId,
				`Статус замовлення з ID ${orderId} успішно змінено на "*${paidStatus[newStatus].status}*".\n\n` +
					`*Новий статус:* ${paidStatus[newStatus].status}\n` +
					`*Деталі замовлення:*\n` +
					`*Дата створення:* ${updatedOrderDetails.createdAt.toLocaleDateString()} ${updatedOrderDetails.createdAt.toLocaleTimeString()}\n` +
					`*Телеграм або номер телефону:* ${updatedOrderDetails.data.orderData.telegramAddress}\n` +
					`*Загальна вартість:* ${calculateTotalPrice(
						updatedOrderDetails.data.orderData.order
					)} грн\n` +
					`*Деталі замовлення:*\n\n` +
					`${orderItems}`, // Добавлено для отображения деталей заказа
				{
					parse_mode: 'Markdown',
				}
			)
		}
	} catch (error) {
		console.error('Error handling callback query:', error)
		bot.sendMessage(chatId, 'Сталася помилка під час обробки запиту.')
	}
})

// Изменение статуса заказа
bot.on('callback_query', async query => {
	const chatId = query.message.chat.id
	const [action, orderId, newStatus] = query.data.split('-')
	if (action === 'change_status') {
		try {
			const updatedOrder = await Order.update(
				{ status: newStatus },
				{ where: { id: orderId } }
			)
			if (updatedOrder[0] === 0) {
				bot.sendMessage(chatId, `Замовлення з ID ${orderId} не знайдено.`)
			} else {
				bot.sendMessage(
					chatId,
					`Статус замовлення з ID ${orderId} успішно змінено на ${paidStatus[newStatus].status}.`
				)
			}
		} catch (error) {
			console.error('Error updating order status:', error)
			bot.sendMessage(chatId, 'Сталася помилка при зміні статусу замовлення.')
		}
	}
})

const createOrder = async (req, res) => {
	try {
		const orderData = req.body

		if (!orderData) {
			return res.status(400).json({ message: 'Order data is required.' })
		}

		const newOrder = await Order.create({
			data: orderData,
			status: 'UNPAID',
		})

		// Format the message to be sent to Telegram
		const message = formatOrderMessage(orderData, newOrder.status)

		await bot.sendMessage(CHAT_ID, message, {
			parse_mode: 'Markdown', // Use Markdown for formatting
		})

		res.status(201).json(newOrder)
	} catch (error) {
		console.error('Error creating order:', error)
		res.status(500).json({ message: 'Error creating order', error })
	}
}

const calculateTotalPrice = orderItems => {
	return orderItems.reduce((total, item) => total + item.price * item.count, 0)
}

// Function to format order message
const formatOrderMessage = (orderData, status) => {
	const orderItems = orderData.orderData.order
		.map(item => {
			return (
				`*Назва:* ${item.name}\n` +
				`*Розмір:* ${item.size}\n` +
				`*Колір:* ${colorOptions[item.color]?.title}\n` +
				`*Кількість:* ${item.count}\n` +
				`*Ціна:* ${item.price} грн\n` +
				`*Зображення:* ${item.image}\n` // This is for displaying the link
			)
		})
		.join('\n')

	return (
		`*Нове замовлення:*\n\n` +
		`${orderItems}\n` + // Add a newline for better formatting
		`*Телеграм або номер телефону:* ${orderData.orderData.telegramAddress}\n` +
		`*Статус:* ${paidStatus[status]?.status || 'Невідомий статус'}`
	)
}

module.exports = {
	createOrder,
}
