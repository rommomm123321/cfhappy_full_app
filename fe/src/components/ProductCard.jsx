import React, { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
	Card,
	CardContent,
	Typography,
	Box,
	Button,
	IconButton,
	Stack,
	Divider,
	Menu,
	MenuItem,
	useMediaQuery,
} from '@mui/material'
import { MoreHoriz, ShoppingCart } from '@mui/icons-material'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { getCurrentUser } from '../config/helpers'

const ProductCard = ({
	product,
	handleAddToCart,
	snackbarOpen,
	handleDeleteProduct,
	setIsEdit,
	setEditableData,
}) => {
	const [selectedSize, setSelectedSize] = useState('')
	const [selectedColor, setSelectedColor] = useState('')

	// Ссылка на экземпляр Swiper
	const swiperRef = useRef(null)
	const isMobile = useMediaQuery('(max-width:600px)')

	const handleSizeChange = size => {
		setSelectedSize(size)
	}

	const handleColorChange = color => {
		setSelectedColor(color)

		const index = product.images.findIndex(image => image.color === color)

		// Переместить Swiper на соответствующий слайд
		if (swiperRef.current && index !== -1) {
			swiperRef.current.slideTo(index)
		}

		if (swiperRef.current && index !== -1) {
			swiperRef.current.slideTo(index)
		}

		// Получаем элемент
		// const editorElement = document.getElementById(
		// 	`${product.name}-${product.id}`
		// )
		// if (editorElement) {
		// 	const rect = editorElement.getBoundingClientRect()

		// 	// Проверка, находится ли элемент в видимой области
		// 	const isVisible =
		// 		rect.top >= 0 &&
		// 		rect.left >= 0 &&
		// 		rect.bottom <=
		// 			(window.innerHeight || document.documentElement.clientHeight) &&
		// 		rect.right <=
		// 			(window.innerWidth || document.documentElement.clientWidth)

		// 	// Скроллим только если элемент не в области видимости
		// 	if (!isVisible) {
		// 		editorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
		// 	}
		// }
	}

	useEffect(() => {
		setSelectedSize('')
		setSelectedColor('')
	}, [snackbarOpen])

	const [anchorEl, setAnchorEl] = useState(null)

	const handleMenuClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleMenuClose = () => {
		setAnchorEl(null)
	}
	const handleDelete = async () => {
		await handleDeleteProduct(product.id)
		handleMenuClose()
	}

	const handleEdit = () => {
		setIsEdit(true)
		setEditableData(product)
		handleMenuClose()
	}

	return (
		<Card
			sx={{
				width: '100%', // Full width for mobile
				maxWidth: '700px',

				margin: 'auto',
				borderRadius: 1,
				boxShadow: 3,
			}}
		>
			{/* Слайдер для изображений */}
			<Swiper
				id={`${product.name}-${product.id}`}
				spaceBetween={10}
				slidesPerView={1}
				loop
				onSwiper={swiper => {
					swiperRef.current = swiper
				}}
			>
				{product.images.map((image, index) => (
					<SwiperSlide key={index}>
						<img
							src={image.url}
							alt={`image-${index}`}
							style={{
								width: '100%',
								height: 'auto',
								borderRadius: isMobile ? '0' : '4px 4px 0 0',
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			<CardContent sx={{ paddingBottom: '10px !important' }}>
				<Typography gutterBottom variant='h6' component='div' color='primary'>
					{product.name}
				</Typography>
				<Typography variant='caption' color='textDisabled' sx={{ mb: 0.5 }}>
					Опис:
				</Typography>
				<Typography
					variant='body2'
					color=''
					sx={{ mb: 2 }}
					whiteSpace='pre-wrap'
				>
					{product.description}
				</Typography>

				{/* Список размеров */}

				<Box sx={{ mb: 2 }}>
					<Typography variant='caption' color='textDisabled' sx={{ mb: 0.5 }}>
						Розмір:
					</Typography>
					<Stack direction='row' spacing={1} sx={{ flexWrap: 'wrap' }}>
						{product.sizes.map(size => (
							<Button
								size='small'
								key={size}
								variant={selectedSize === size ? 'contained' : 'text'}
								color='inherit'
								onClick={() => handleSizeChange(size)}
								sx={{
									border: 'none',
									minWidth: '30px', // уменьшаем ширину кнопки
									height: '30px', // уменьшаем высоту кнопки
									fontSize: '12px', // уменьшаем размер шрифта
									padding: '4px 8px', // уменьшаем внутренние отступы
									borderRadius: '4px', // задаем компактный радиус для закругленных углов
								}}
							>
								{size}
							</Button>
						))}
					</Stack>
				</Box>

				{/* Список цветов */}
				<Box sx={{ mb: 2 }}>
					<Typography variant='caption' color='textDisabled' sx={{ mb: 1 }}>
						Колір:
					</Typography>
					<Stack direction='row' spacing={1} sx={{ flexWrap: 'wrap' }}>
						{product.images.map(value => (
							<Button
								size='small'
								key={value.color}
								color='inherit'
								variant={selectedColor === value.color ? 'contained' : 'text'}
								onClick={() => handleColorChange(value.color)}
								sx={{
									border: 'none',
									minWidth: '30px', // уменьшаем ширину кнопки
									height: '30px', // уменьшаем высоту кнопки
									fontSize: '12px', // уменьшаем размер шрифта
									padding: '4px 8px', // уменьшаем внутренние отступы
									borderRadius: '4px', // задаем компактный радиус для закругленных углов
								}}
							>
								<Box
									sx={{
										width: 24,
										height: 24,
										backgroundColor: `${value.color}`,
										borderRadius: '50%',
										border: '1px solid #0000009e',
									}}
								/>
								{/* Удалите следующую строку для скрытия текстового значения цвета */}
								{/* {value.color} */}
							</Button>
						))}
					</Stack>
				</Box>
				{/* Цена и кнопка добавления в корзину */}
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Typography variant='h7' color='success'>
						₴{product.price}
					</Typography>
					<Box>
						<IconButton
							size='large'
							color={selectedSize && selectedColor ? 'success' : 'primary'}
							aria-label='add to shopping cart'
							onClick={() =>
								handleAddToCart(product, selectedSize, selectedColor)
							}
							sx={{ borderRadius: '5px' }}
						>
							<ShoppingCart />
						</IconButton>
						{getCurrentUser()?.role == 'coach' &&
							localStorage.getItem('token') && (
								<IconButton
									size='small'
									sx={{ marginLeft: 'auto', borderRadius: '5px' }}
									onClick={handleMenuClick}
								>
									<MoreHoriz />
								</IconButton>
							)}
					</Box>
				</Stack>
			</CardContent>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
				// disableScrollLock
			>
				<MenuItem onClick={handleEdit}>Редагувати</MenuItem>
				<MenuItem onClick={handleDelete}>Видалити</MenuItem>
			</Menu>
		</Card>
	)
}

export default ProductCard
