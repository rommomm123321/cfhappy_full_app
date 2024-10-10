import { useNavigate, useParams } from 'react-router-dom'
import { fetchPost, deleteComment } from '../config/helpers'
import { useEffect, useState } from 'react'
import { useLoader } from '../hooks/useLoader'
import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Typography,
	Link,
	IconButton,
	Grid2,
	Pagination,
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import dayjs from 'dayjs'
import 'dayjs/locale/uk'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { AuthModal } from '../components/AuthModal'
import { Editor } from '../components/Editor'
import { Comment } from '../components/Comment'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import '../customEditorStyles.css'

dayjs.locale('uk')

export const WorkoutDetails = () => {
	const [data, setData] = useState(null)
	const [load, setLoad] = useState(false)
	const [error, setError] = useState(null)
	const [open, setOpen] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [editableData, setEditableData] = useState(null)
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const { id } = useParams()
	const navigate = useNavigate()

	const { showLoader, hideLoader } = useLoader()

	const fetchData = async () => {
		showLoader()

		try {
			const res = await fetchPost(id, page)
			setTimeout(() => {
				setData(res.post)
				setTotalPages(res.totalPages)
				hideLoader()
			}, 1000)
		} catch (error) {
			console.log('error :>> ', error)
			setError(error.response.data.message)
			console.error('Error fetching posts:', error)
			hideLoader()
		}
	}
	console.log('data :>> ', data)
	const handleDeleteComment = async id => {
		try {
			await deleteComment(id)
			setLoad(prev => !prev)
		} catch (error) {
			console.error('Error deleting content:', error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [id, load, page])

	useEffect(() => {
		if (error === 'Post not found') {
			navigate('/404')
		}
	}, [error])

	const handlePageChange = (event, value) => {
		setPage(value)
		window.scrollTo({ top: 0, behavior: 'smooth' })

		const editorElement = document.getElementById('commentEditor')
		if (editorElement) {
			editorElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	if (!data) return null

	return (
		<Box
			sx={{
				background: '#121212',
			}}
			padding={{ xs: '7rem 0.5rem 5rem 0.5rem', sm: '7rem 1rem 5rem 1rem' }}
		>
			<Box display='flex' alignItems='center' mb={3} justifyContent='center'>
				<IconButton
					aria-label='Go to previous day'
					onClick={() => navigate(`/workout/${Number(id) + 1}`)}
				>
					<ArrowBackIosNewIcon />
				</IconButton>
				<Grid2
					container
					textAlign={{ xs: 'center', sm: 'inherit' }}
					display='flex'
					alignItems='center'
					flexDirection='column'
				>
					<Grid2 item>
						<Typography
							variant='h5'
							sx={{ marginLeft: 2, marginRight: 2, textTransform: 'uppercase' }}
						>
							{dayjs(data.createdAt).format('dddd')}
						</Typography>
					</Grid2>
					<Grid2 item>
						<Typography variant='h4' sx={{ marginLeft: 2, marginRight: 2 }}>
							{dayjs(data.createdAt).format('DD-MM-YYYY')}
						</Typography>
					</Grid2>
				</Grid2>

				<IconButton
					aria-label='Go to previous day'
					onClick={() => navigate(`/workout/${Number(id) - 1}`)}
				>
					<ArrowForwardIosIcon />
				</IconButton>
			</Box>

			<Card>
				<CardContent>
					<Typography
						variant='h5'
						component='div'
						gutterBottom
						sx={{ textTransform: 'uppercase' }}
						color='primary'
					>
						ТРЕНУВАННЯ ДНЯ
					</Typography>
					<Divider />
					<Box sx={{ marginY: 2 }}>
						<div
							dangerouslySetInnerHTML={{
								__html: data?.content,
							}}
						/>
					</Box>
				</CardContent>
				<Grid2 container spacing={0.5}>
					{Array.isArray(data.voice_content) &&
						data.voice_content.length > 0 &&
						// Перемещаем Grid2 item внутрь map, чтобы каждый аудиоплеер был в своем собственном элементе Grid2
						data.voice_content
							.sort((a, b) => a.number - b.number)
							.map(src => (
								<Grid2
									size={{ xs: 12 }}
									item
									key={src.number}
									sx={{ padding: '8px' }}
								>
									{' '}
									{/* Задаем xs={12} для полной ширины */}
									<AudioPlayer
										src={src.value} // Используем значение элемента массива
										// onPlay={e => console.log(`Playing audio ${src.number}`)} // Используем number для идентификации
										customAdditionalControls={[]}
										showSkipControls={false}
										showJumpControls={false}
										customVolumeControls={[]}
										layout='horizontal-reverse'
										autoPlay={false}
									/>
								</Grid2>
							))}
				</Grid2>
				<Divider />
				<CardContent>
					<Grid2
						spacing={1}
						container
						display='flex'
						justifyContent='space-between'
						alignItems='center'
					>
						<Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
							<Typography
								variant='body1'
								component='div'
								sx={{ textTransform: 'uppercase' }}
								color='textDisabled'
							>
								Комментарі за {dayjs(data.createdAt).format('DD-MM-YYYY')}
							</Typography>
						</Grid2>
						<Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
							{!localStorage.getItem('token') && (
								<Button
									size='small'
									variant='contained'
									color='inherit'
									fullWidth
									onClick={() => handleOpen()}
									sx={{ textTransform: 'uppercase' }}
								>
									Увійдіть, щоб коментувати
								</Button>
							)}
						</Grid2>
					</Grid2>
				</CardContent>
			</Card>
			{localStorage.getItem('token') && (
				<Box padding='10px'>
					<Editor
						setLoad={setLoad}
						isComment={true}
						isEdit={isEdit}
						editableData={editableData}
						setIsEdit={setIsEdit}
						page={page}
						setPage={setPage}
					/>
				</Box>
			)}
			<Box>
				{data.comments.map(comment => (
					<Comment
						key={comment.id}
						comment={comment}
						setIsEdit={setIsEdit}
						setEditableData={setEditableData}
						handleDeleteComment={handleDeleteComment}
					/>
				))}
			</Box>
			{data.comments.length > 0 && (
				<Pagination
					size='small'
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
				/>
			)}

			<AuthModal open={open} handleClose={handleClose} />
		</Box>
	)
}
