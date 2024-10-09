import {
	Alert,
	Box,
	Button,
	Fade,
	Grid2,
	Pagination,
	Snackbar,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { ProductModal } from '../components/ProductModal'
import { useLoader } from '../hooks/useLoader'
import { deleteProduct, fetchProducts, getCurrentUser } from '../config/helpers'
import ProductCard from '../components/ProductCard'
import AddIcon from '@mui/icons-material/Add'
import FloatingCartButton from '../components/FloatingCartButton'
export const Store = () => {
	const [modalOpen, setModalOpen] = useState(false)

	const handleOpen = () => setModalOpen(true)
	const handleClose = () => {
		setModalOpen(false)
		setIsEdit(false)
		setEditableData(null)
	}

	const [data, setData] = useState([])
	const [page, setPage] = useState(1)
	const [load, setLoad] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [editableData, setEditableData] = useState(null)
	const [queryParams, setQueryParams] = useState({ title: '', content: '' })
	const [totalPages, setTotalPages] = useState(0)
	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarType, setSnackbarType] = useState('')
	const [snackbarMessage, setSnackbarMessage] = useState('')

	const itemsPerPage = 10

	const { showLoader, hideLoader } = useLoader()

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false)
	}

	const fetchData = async () => {
		showLoader()

		try {
			// Fetch posts
			const res = await fetchProducts(page, itemsPerPage)
			setTimeout(() => {
				setData(res.products)
				setTotalPages(res.totalPages)
				hideLoader()
			}, 1000)
		} catch (error) {
			console.error('Error fetching posts:', error)
			hideLoader()
		}
	}

	const handleDeleteProduct = async id => {
		try {
			await deleteProduct(id)
			setLoad(prev => !prev)
		} catch (error) {
			console.error('Error deleting content:', error)
		}
	}

	useEffect(() => {
		if (isEdit) setModalOpen(true)
	}, [isEdit])

	useEffect(() => {
		fetchData()
	}, [page, queryParams, load])

	const handlePageChange = (event, value) => {
		setPage(value)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleAddToCart = (product, selectedSize, selectedColor) => {
		const { price, name, id: productId, images } = product
		setSnackbarType('')
		if (!selectedSize || !selectedColor) {
			setSnackbarType('warning')
			setSnackbarMessage('Будь ласка, оберіть розмір і колір!')
			setSnackbarOpen(true)
			return // Exit the function if size or color is not selected
		}

		// Получаем существующие продукты из localStorage
		const existingProducts = JSON.parse(localStorage.getItem('cart')) || []

		// Находим изображение в зависимости от выбранного цвета
		const selectedImage = images.find(
			image => image.color === selectedColor
		)?.url

		// Проверяем, есть ли уже продукт в корзине
		const productIndex = existingProducts.findIndex(
			item =>
				item.id === productId &&
				item.size === selectedSize &&
				item.color === selectedColor // Use selectedColor instead of color from product
		)

		if (productIndex !== -1) {
			// Если продукт уже в корзине, увеличиваем количество
			existingProducts[productIndex].count += 1
		} else {
			// Если продукта нет, добавляем новый объект
			existingProducts.push({
				id: productId,
				name: name,
				price: price,
				size: selectedSize, // Use selectedSize instead of size from product
				color: selectedColor, // Use selectedColor instead of color from product
				count: 1,
				image: selectedImage, // Сохраняем выбранное изображение
			})
		}

		// Сохраняем обновленный массив продуктов обратно в localStorage
		localStorage.setItem('cart', JSON.stringify(existingProducts))
		const event = new Event('cartUpdated') // Create a new event
		window.dispatchEvent(event)
		// Устанавливаем сообщение и открываем Snackbar
		setSnackbarMessage(`Товар "${name}" успішно додано до кошика!`) // Use name variable directly
		setSnackbarOpen(true)
	}

	return (
		<Box padding={{ xs: '7rem 1rem 5rem 1rem', sm: '7rem 2rem 5rem 2rem' }}>
			<Typography
				variant='h4'
				align='center'
				gutterBottom
				textTransform='uppercase'
				fontWeight='bold'
			>
				Мерч CrossFit Happy
			</Typography>
			<>
				{getCurrentUser()?.role == 'coach' && (
					<Box display='flex' justifyContent='flex-end' mb={2}>
						<Button
							variant='outlined'
							onClick={handleOpen}
							startIcon={<AddIcon />}
							sx={{
								width: { xs: '100%', sm: 'auto' }, // fullWidth на мобильных, авто на больших экранах
							}}
						>
							Додати товар
						</Button>
					</Box>
				)}

				<ProductModal
					open={modalOpen}
					handleClose={handleClose}
					setLoad={setLoad}
					editableData={editableData}
					setIsEdit={setIsEdit}
					isEdit={isEdit}
				/>
			</>
			<Grid2 container spacing={2} justifyContent='center'>
				{data.map(product => (
					<Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={product.id}>
						<ProductCard
							product={product}
							handleAddToCart={handleAddToCart}
							snackbarOpen={snackbarOpen}
							handleDeleteProduct={handleDeleteProduct}
							setIsEdit={setIsEdit}
							setEditableData={setEditableData}
						/>
					</Grid2>
				))}
			</Grid2>
			<Snackbar
				TransitionComponent={Fade}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
				open={snackbarOpen}
				autoHideDuration={4000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarType || 'success'}
					sx={{ width: '100%' }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
			<Pagination
				size='small'
				count={totalPages}
				page={page}
				onChange={handlePageChange}
				sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
			/>
		</Box>
	)
}
