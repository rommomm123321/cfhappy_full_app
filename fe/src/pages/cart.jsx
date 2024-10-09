import { Add, Delete, Remove } from '@mui/icons-material'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid2,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

export const Cart = ({ setDrawerOpen }) => {
	const [cartItems, setCartItems] = useState(() => {
		const savedCart = localStorage.getItem('cart')
		return savedCart ? JSON.parse(savedCart) : []
	})

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cartItems))
		const event = new Event('cartUpdated') // Create a new event
		window.dispatchEvent(event)
		if (cartItems.length <= 0) {
			setDrawerOpen(false)
		}
	}, [cartItems])

	const handleRemoveFromCart = product => {
		setCartItems(
			cartItems.filter(
				item =>
					!(
						item.id === product.id &&
						item.color === product.color &&
						item.size === product.size
					)
			)
		)
		localStorage.setItem('cart', JSON.stringify(cartItems))
		const event = new Event('cartUpdated') // Create a new event
		window.dispatchEvent(event)
	}

	const handleUpdateQuantity = (product, newQuantity) => {
		if (newQuantity <= 0) {
			handleRemoveFromCart(product)
		} else {
			setCartItems(
				cartItems.map(item =>
					item.id === product.id &&
					item.color === product.color &&
					item.size === product.size
						? { ...item, count: newQuantity }
						: item
				)
			)
		}
		localStorage.setItem('cart', JSON.stringify(cartItems))
		const event = new Event('cartUpdated') // Create a new event
		window.dispatchEvent(event)
	}

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

	return (
		<Box padding={{ xs: '1rem 0.5rem ', sm: '1rem' }}>
			<Grid2 container spacing={2}>
				{cartItems.map((item, i) => {
					return (
						<Grid2 key={i} width='100%'>
							<Card
								sx={{
									display: 'flex',
									alignItems: 'center',
									padding: '10px',
								}}
							>
								<div
									key={i}
									style={{
										display: 'flex',
										alignItems: 'center',
										width: '100%',
									}}
								>
									<CardMedia
										component='img'
										sx={{
											width: 120,
											height: 120,
											borderRadius: 1,
											objectFit: 'cover',
											marginRight: 1,
										}}
										image={item.image} // Добавляем изображение
										alt={item.name}
									/>
									<div style={{ flexGrow: 1 }}>
										<Typography variant='h6' color='textPrimary'>
											{item.name}
										</Typography>
										<Typography variant='caption' color='textSecondary'>
											₴ {item.price.toFixed(2)}
										</Typography>
										<Box display='flex'>
											<Typography
												style={{ color: item.color, paddingRight: '5px' }}
											>
												{colorOptions[item.color]?.title}
											</Typography>
											<Typography>/ {item.size}</Typography>
										</Box>
										<Stack
											gap={1}
											display='flex'
											flexDirection='row'
											alignItems='flex-end'
											justifyContent='flex-end'
										>
											<TextField
												variant='standard'
												onChange={event =>
													handleUpdateQuantity(item, event.target.value || 1)
												}
												value={item.count}
												slotProps={{
													input: {
														startAdornment: (
															<InputAdornment position='start'>
																<IconButton
																	size='small'
																	onClick={() =>
																		handleUpdateQuantity(item, --item.count)
																	}
																>
																	<Remove />
																</IconButton>
															</InputAdornment>
														),
														endAdornment: (
															<InputAdornment position='end'>
																<IconButton
																	size='small'
																	onClick={() =>
																		handleUpdateQuantity(item, ++item.count)
																	}
																>
																	<Add />
																</IconButton>
															</InputAdornment>
														),
													},
												}}
												size='small'
												inputProps={{
													style: {
														textAlign: 'center',
														width: '30px',
													},
													maxLength: 2,
												}}
											/>

											<IconButton
												size='small'
												onClick={() => handleUpdateQuantity(item, 0)}
												color='error'
											>
												<Delete />
											</IconButton>
										</Stack>
									</div>
								</div>
							</Card>
						</Grid2>
					)
				})}
			</Grid2>
		</Box>
	)
}
