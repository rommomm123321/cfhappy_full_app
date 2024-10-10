import {
	Alert,
	Autocomplete,
	Box,
	Button,
	Grid2,
	IconButton,
	Menu,
	MenuItem,
	Modal,
	Snackbar,
	Stack,
	TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useMemo, useState } from 'react'
import { addProduct, getCurrentUser, updateProduct } from '../config/helpers' // Импортируйте свою функцию для отправки данных на сервер
import { Clear, MoreHoriz } from '@mui/icons-material'
import axios from 'axios'
import { uploadFile } from 'react-s3'

import { Buffer } from 'buffer'
window.Buffer = Buffer
// eslint-disable-next-line react/prop-types
export const ProductModal = ({
	open,
	handleClose,
	setLoad,
	editableData,
	setIsEdit,
	isEdit,
}) => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [sizes, setSizes] = useState([])
	const [error, setError] = useState(null)
	const [images, setImages] = useState([])
	const handleAddProduct = async () => {
		const productData = {
			name,
			description,
			price,
			sizes,
			images,
		}

		try {
			const response = await addProduct(productData)
			if (response.status !== 201) {
				throw new Error('Ошибка при добавлении товара')
			}
			setLoad(prev => !prev)
			setTimeout(() => {
				handleClose()
				resetForm('')
			}, 1000)
			// window.location.reload() // Перезагружаем страницу или обновляем список товаров
		} catch (error) {
			setError('Не вдалося додати товар. Будь ласка, перевірте дані.')
			console.error('Error adding product:', error)
		}
	}
	const handleCloseSnackbar = () => {
		setError(null)
	}

	const resetForm = () => {
		setName('')
		setDescription('')
		setPrice('')
		setSizes([])
		setImages([])
	}

	const _S3_BUCKET = process.env.S3_BUCKET
	const _REGION = process.env.REGION
	const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID
	const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY

	const config = {
		bucketName: _S3_BUCKET,
		region: _REGION,
		accessKeyId: ACCESS_KEY_ID,
		secretAccessKey: SECRET_ACCESS_KEY,
	}

	const handleImageChange = async event => {
		const files = Array.from(event.target.files)
		const uploadedImages = []

		for (const file of files) {
			const data = new FormData()
			data.append('image', file)
			try {
				setLoad(prev => !prev)
				// const response = await uploadFile(file, config)

				const res = await axios.post(
					'https://api.imgbb.com/1/upload?expiration=15552000&key=c8a4ce4d7267fbf90d795a2f17b3c72c',
					data,
					{
						headers: {
							accept: 'application/json',
							'Accept-Language': 'en-US,en;q=0.8',
							'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
						},
					}
				)

				uploadedImages.push({ url: res.data.data.image.url, color: '' })

				// uploadedImages.push({ url: response.location, color: '' })
			} catch (error) {
				console.error('Error uploading image:', error)
			}
		}

		setImages(prevImages => [...prevImages, ...uploadedImages])
	}

	const handleColorChange = (imageUrl, selectedColor) => {
		setImages(prevImages =>
			prevImages.map(
				image =>
					image.url === imageUrl ? { ...image, color: selectedColor } : image // Update color in the corresponding image object
			)
		)
	}

	const handleImageDelete = imageUrl => {
		setImages(prevImages => prevImages.filter(image => image.url !== imageUrl)) // Filter out the deleted image
	}

	const europeanSizes = [
		{ title: 'XS', label: 'Extra Small' },
		{ title: 'S', label: 'Small' },
		{ title: 'M', label: 'Medium' },
		{ title: 'L', label: 'Large' },
		{ title: 'XL', label: 'Extra Large' },
		{ title: 'XXL', label: 'Double Extra Large' },
		{ title: '3XL', label: 'Triple Extra Large' },
		{ title: 'OVERSIZE', label: 'Triple Extra Large' },
		{ title: 'One size', label: 'One size' },
	]

	const availableSizes = useMemo(() => {
		return europeanSizes.filter(size => !sizes.includes(size.title))
	}, [sizes])

	const handleSizeChange = (event, value) => {
		setSizes(value.map(item => item.title)) // Измените состояние sizes на массив строк
	}

	const colorOptions = [
		{ title: 'Червоний', value: '#FF0000' }, // Red
		{ title: 'Зелений', value: '#008000' }, // Green
		{ title: 'Синій', value: '#0000FF' }, // Blue
		{ title: 'Жовтий', value: '#FFFF00' }, // Yellow
		{ title: 'Чорний', value: '#000000' }, // Black
		{ title: 'Білий', value: '#FFFFFF' }, // White
		{ title: 'Сірий', value: '#808080' }, // Gray
		{ title: 'Оливковий', value: '#808000' }, // Olive
		{ title: 'Помаранчевий', value: '#FFA500' }, // Orange
		{ title: 'Блакитний', value: '#00BFFF' }, // Light Blue
		{ title: 'Фіолетовий', value: '#800080' }, // Purple
		{ title: 'Темно-синій', value: '#00008B' }, // Dark Blue
		{ title: 'Бордовий', value: '#800000' }, // Maroon
		{ title: 'Темно-зелений', value: '#006400' }, // Dark Green
		{ title: 'Неоновий зелений', value: '#39FF14' }, // Neon Green
	]

	useEffect(() => {
		resetForm()
		if (editableData) {
			setName(editableData.name)
			setDescription(editableData.description)
			setPrice(editableData.price)
			setSizes(editableData.sizes)
			setImages(editableData.images)
		}
	}, [open])

	const handleUpdate = async () => {
		const productData = {
			name,
			description,
			price,
			sizes,
			images,
		}

		try {
			const response = await updateProduct(editableData?.id, productData)

			resetForm()
			setLoad(prev => !prev)
			handleClose()
		} catch (error) {
			console.error('Error updating content:', error)
		}
	}

	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						// position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
						border: '1px solid #424242',
						// eslint-disable-next-line no-dupe-keys
						position: 'relative',
						maxHeight: '80vh', // Set a maximum height for the modal
						overflowY: 'auto', // Enable vertical scrolling
					}}
				>
					<IconButton
						size='small'
						aria-label='close'
						onClick={handleClose}
						sx={{
							position: 'absolute',
							top: 8,
							right: 8,
						}}
					>
						<CloseIcon />
					</IconButton>
					<Grid2 container spacing={2} sx={{ marginTop: '10px' }}>
						<Grid2 size={{ xs: 12 }}>
							<TextField
								size='small'
								label='Назва товару'
								variant='outlined'
								fullWidth
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</Grid2>
						<Grid2 size={{ xs: 12 }}>
							<TextField
								size='small'
								label='Опис товару'
								variant='outlined'
								fullWidth
								multiline
								minRows={4}
								maxRows={10}
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
						</Grid2>
						<Grid2 size={{ xs: 12 }}>
							<TextField
								size='small'
								label='Ціна'
								variant='outlined'
								fullWidth
								type='number'
								value={price}
								onChange={e => setPrice(e.target.value)}
							/>
						</Grid2>
						<Grid2 size={{ xs: 12 }}>
							<Autocomplete
								fullWidth
								multiple
								slotProps={{
									textField: {
										fullWidth: true,
										size: 'small',
									},
								}}
								id='multiple-limit-tags'
								options={availableSizes}
								value={sizes.map(size => ({ title: size }))} // Отображение выбранных значений
								onChange={handleSizeChange}
								getOptionLabel={option => option.title}
								renderInput={params => (
									<TextField
										{...params}
										label='Розмір'
										placeholder='Розмір'
										size='small'
									/>
								)}
							/>
						</Grid2>
						<Grid2 size={{ xs: 12 }}>
							<input
								accept='image/*'
								id='image-upload'
								type='file'
								multiple
								onChange={handleImageChange}
								style={{ display: 'none' }}
							/>
							<label htmlFor='image-upload'>
								<Button
									variant='contained'
									component='span'
									fullWidth
									size='small'
								>
									Додати фото
								</Button>
							</label>
						</Grid2>
						<Grid2 size={{ xs: 12 }}>
							<Stack spacing={2}>
								{images.map((image, index) => {
									const usedColors = images
										.filter(img => img.url !== image.url) // Исключаем текущее изображение
										.map(img => img.color) // Собираем уже использованные цвета

									const availableColors = colorOptions.filter(
										option => !usedColors.includes(option.value)
									) // Фильтруем доступные цвета

									return (
										<Box
											key={image.url}
											sx={{
												position: 'relative',
												border: '1px solid #cccccc91',
												borderRadius: 2,
												overflow: 'hidden',
											}}
										>
											<img
												src={image.url}
												alt={`Image ${index + 1}`}
												style={{
													width: '100%',
													height: '100%',
													objectFit: 'cover',
												}}
											/>

											<Autocomplete
												options={availableColors} // Только доступные цвета
												getOptionLabel={option => option.title}
												value={
													availableColors.find(
														option => option.value === image.color
													) || null
												}
												onChange={(event, value) => {
													handleColorChange(image.url, value?.value || '')
												}} // Обновляем цвет
												renderInput={params => (
													<TextField
														size='small'
														{...params}
														label='Колір'
														placeholder='Оберіть колір'
													/>
												)}
												slotProps={{
													textField: {
														size: 'small',
													},
												}}
												renderOption={(props, option) => (
													<Box
														component='li'
														key={option.value}
														{...props}
														sx={{
															display: 'flex',
															alignItems: 'center',
															gap: 1,
														}}
													>
														<Box
															sx={{
																width: 24,
																height: 24,
																backgroundColor: option.value, // HEX-код для фона
																borderRadius: 1,
																border: '1px solid #ccc',
															}}
														/>
														{option.title} {/* Название цвета */}
													</Box>
												)}
											/>
											<IconButton
												size='small'
												aria-label='delete'
												onClick={() => handleImageDelete(image.url)}
												sx={{
													position: 'absolute',
													top: 0,
													right: 0,
												}}
											>
												<Clear />
											</IconButton>
										</Box>
									)
								})}
							</Stack>
						</Grid2>
					</Grid2>

					{isEdit ? (
						<Box display='flex' justifyContent='end' marginTop='10px'>
							<Button
								variant='outlined'
								color='secondary'
								onClick={handleClose}
							>
								Відмінити
							</Button>
							<Button
								variant='contained'
								color='primary'
								onClick={handleUpdate}
								sx={{ marginLeft: '10px' }}
								disabled={
									!name ||
									!description ||
									!price ||
									!sizes.length ||
									!images.length ||
									images.some(image => !image.color)
								}
							>
								Оновити
							</Button>
						</Box>
					) : (
						<Button
							id='added-product'
							variant='contained'
							color='success'
							onClick={handleAddProduct}
							fullWidth
							sx={{ mt: 2 }}
							disabled={
								!name ||
								!description ||
								!price ||
								!sizes.length ||
								!images.length ||
								images.some(image => !image.color)
							}
						>
							Додати товар
						</Button>
					)}
				</Box>
			</Modal>

			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				open={!!error}
				autoHideDuration={4000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity='error'
					sx={{ width: '100%' }}
				>
					{error}
				</Alert>
			</Snackbar>
		</>
	)
}
