import { useState, useEffect } from 'react'
import {
	Fab,
	Badge,
	Drawer,
	Box,
	Typography,
	IconButton,
	Button,
	Stack,
	TextField,
	Snackbar,
	Alert,
} from '@mui/material'
import { Close, Phone, ShoppingCart, Telegram } from '@mui/icons-material'
import { getCart, sendOrder } from '../config/helpers'
import { useNavigate } from 'react-router-dom'
import { Cart } from '../pages/cart'
import { useLoader } from '../hooks/useLoader'

// Функция для получения корзины из localStorage
const FloatingCartButton = () => {
	const [cartItemCount, setCartItemCount] = useState(0)
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [totalPrice, setTotalPrice] = useState(0) // Состояние для хранения общей суммы
	const [telegramAddress, setTelegramAddress] = useState('')
	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [error, setError] = useState(null)
	const [messageType, setMessageType] = useState('success')
	const [message, setMessage] = useState(null)

	const { showLoader, hideLoader } = useLoader()

	// Функция для обновления количества товаров
	const updateCartItemCount = () => {
		const cart = getCart() || []
		const itemCount = cart.reduce((total, item) => total + item.count, 0) // Считаем количество товаров
		const total = cart.reduce((sum, item) => sum + item.price * item.count, 0) // Считаем общую сумму
		setCartItemCount(itemCount)
		setTotalPrice(total)
	}

	// Обновление количества товаров в корзине при загрузке и изменении localStorage
	useEffect(() => {
		// Изначально обновляем количество товаров при монтировании компонента
		updateCartItemCount()

		// Добавляем слушателя для отслеживания изменений в localStorage
		const handleStorageChange = () => {
			updateCartItemCount()
		}

		// Добавляем слушателя для отслеживания обновлений корзины
		window.addEventListener('cartUpdated', handleStorageChange)

		// Очищаем слушателя при размонтировании компонента
		return () => {
			window.removeEventListener('cartUpdated', handleStorageChange)
		}
	}, [])
	const navigate = useNavigate()

	const handleClearCart = () => {
		localStorage.removeItem('cart')
		const event = new Event('cartUpdated') // Create a new event
		window.dispatchEvent(event)
		setDrawerOpen(false)
	}

	const handleOrder = async () => {
		// Regular expression to check for valid phone number or Telegram address
		const telegramRegex = /^(?:\+\d{1,3}\d{10}|\@\w+)$/ // Accepts "+<country_code><10_digit_phone_number>" or "@username"

		if (telegramRegex.test(telegramAddress.trim())) {
			showLoader()

			const orderData = {
				telegramAddress: telegramAddress.trim(),
				order: getCart(),
			}
			try {
				const res = await sendOrder(orderData)
				console.log('res :>> ', res)
				setTimeout(() => {
					handleClearCart() // Clear the cart
					setTelegramAddress('') // Reset Telegram address
					setSnackbarOpen(true) // Open the snackbar for success message
					setDrawerOpen(false) // Close the drawer
					hideLoader()
					setMessageType('success')
					setMessage(
						'Ваше замовлення успішно сформовано! Скоро з вами зв’яжеться оператор.'
					)
				}, 2000)
			} catch (error) {
				setMessageType('error')
				setMessage('Не вдалося надіслати замовлення. Спробуйте ще раз.')
				hideLoader()
			}

			// Valid input
			// Here you can implement your order logic (e.g., sending the order to the backend)
			// After successfully sending the order:
		} else {
			hideLoader()
			setError('Будь ласка, введіть дійсну адресу Telegram або номер телефону.')
		}
	}

	const handleSnackbarClose = () => {
		setSnackbarOpen(false)
		setMessage(null)
	}

	useEffect(() => {
		if (error && telegramAddress) {
			setError(null)
		}
	}, [telegramAddress, drawerOpen])

	useEffect(() => {
		setError(null)
		setTelegramAddress('')
	}, [drawerOpen])

	// const drawerHeight = window.innerHeight - 70

	// const [drawerHeight, setDrawerHeight] = useState('100vh')

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		// Логика для обновления высоты Drawer или его содержимого
	// 		setDrawerHeight(window.innerHeight - 70) // Учитывая место для нижнего меню
	// 	}

	// 	window.addEventListener('resize', handleResize)
	// 	handleResize() // Установите начальную высоту

	// 	return () => {
	// 		window.removeEventListener('resize', handleResize)
	// 	}
	// }, [])

	return (
		<>
			{cartItemCount > 0 && ( // Условный рендеринг для отображения кнопки
				<Fab
					size='large'
					color='success'
					aria-label='cart'
					onClick={() => setDrawerOpen(true)}
					sx={{
						position: 'fixed',
						bottom: 40,
						right: 16,
						zIndex: 1000,
					}}
				>
					<Badge badgeContent={cartItemCount} color='error'>
						<ShoppingCart />
					</Badge>
				</Fab>
			)}
			<Drawer
				anchor='right'
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				PaperProps={{
					sx: {
						width: {
							xs: '90%',
							sm: '450px',
						},
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: '#000000e3',
						height: {
							xs: 'calc(100% - 70px)',
							sm: '100%',
						}, // Устанавливаем высоту Drawer на 100%
					},
				}}
			>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					padding='5px 16px 5px 16px'
					borderBottom='1px solid rgba(255, 255, 255, 0.12)'
				>
					<Typography variant='h5'>Кошик</Typography>
					<IconButton onClick={() => setDrawerOpen(false)}>
						<Close />
					</IconButton>
				</Box>
				<Box
					sx={{
						flex: 1,
						overflowY: 'auto',
						borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
					}}
				>
					<Cart setDrawerOpen={setDrawerOpen} />
				</Box>
				<Stack spacing={1} sx={{ margin: '1rem' }}>
					<Typography>Всього: ₴ {totalPrice.toFixed(2)}</Typography>

					{/* Telegram input field */}
					<TextField
						label='Telegram або номер телефону'
						// placeholder='Telegram або номер телефону'
						value={telegramAddress}
						onChange={e => setTelegramAddress(e.target.value)}
						variant='standard'
						fullWidth
						error={!!error} // Highlight the field if there's an error
						helperText={error} // Show error message below the field
						InputProps={{
							startAdornment: (
								<Box paddingRight='5px'>
									{/* <IconButton edge='start'> */}
									<Telegram />
									{/* </IconButton> */}
								</Box>
							),
						}}
						sx={{
							'& .MuiInputBase-root': {
								borderColor: !!error ? 'red' : undefined, // Highlight with red if error
							},
						}}
					/>

					<Button
						fullWidth
						variant='contained'
						color='success'
						onClick={handleOrder}
					>
						Замовити
					</Button>

					<Button
						fullWidth
						variant='outlined'
						color='warning'
						onClick={handleClearCart}
					>
						Очистити кошик
					</Button>
				</Stack>
			</Drawer>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				open={!!message}
				autoHideDuration={4000}
				onClose={handleSnackbarClose}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity={messageType}
					sx={{ width: '100%' }}
				>
					{message}
				</Alert>
			</Snackbar>
		</>
	)
}

export default FloatingCartButton
