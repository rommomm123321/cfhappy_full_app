import { ThumbUp, Comment, MoreHoriz } from '@mui/icons-material'
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Divider,
	Grid2,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material'
import dayjs from 'dayjs'

import '../index.css'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../config/helpers'
import { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import '../customEditorStyles.css'

export const WorkoutCard = ({
	workout,
	handleDeletePost,
	setIsEdit,
	setEditableData,
}) => {
	const navigate = useNavigate()

	const handleCardClick = event => {
		if (!event.target.closest('a')) {
			navigate(`/workout/${workout.id}`)
		}
	}

	const [anchorEl, setAnchorEl] = useState(null)

	const handleMenuClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleEdit = () => {
		setIsEdit(true)
		setEditableData(workout)
		handleMenuClose()
		const editorElement = document.getElementById('commentEditor')
		if (editorElement) {
			editorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	const handleDelete = async () => {
		await handleDeletePost(workout.id)
		handleMenuClose()
	}

	return (
		<Card
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				borderRadius: 1,
			}}
		>
			<CardActionArea>
				<CardContent onClick={handleCardClick}>
					<Typography gutterBottom variant='h5' component='div' color='primary'>
						{dayjs(workout?.title).format('DD-MM-YYYY')}
					</Typography>
					<Box
						variant='body2'
						sx={{
							display: 'block',
							maxHeight: '600px',
							overflow: 'hidden',
							// textOverflow: 'ellipsis',
							whiteSpace: 'wrap',
						}}
					>
						<div
							dangerouslySetInnerHTML={{
								__html: workout?.content,
							}}
						/>
					</Box>
				</CardContent>
			</CardActionArea>
			<Box>
				{Array.isArray(workout.voice_content) &&
					workout.voice_content.length > 0 && <Divider />}
				<Grid2 container spacing={0.5}>
					{Array.isArray(workout.voice_content) &&
						workout.voice_content.length > 0 &&
						// Перемещаем Grid2 item внутрь map, чтобы каждый аудиоплеер был в своем собственном элементе Grid2
						workout.voice_content
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
										autoPlay={false}
										src={src.value} // Используем значение элемента массива
										// onPlay={e => console.log(`Playing audio ${src.number}`)} // Используем number для идентификации
										customAdditionalControls={[]}
										// showSkipControls={false}
										showJumpControls={false}
										// customVolumeControls={[]}
										// layout='horizontal-reverse'
									/>
								</Grid2>
							))}
				</Grid2>
				<Box>
					<Divider />
					<CardActions
						sx={{
							justifyContent: 'flex-end',
							padding: '5px',
							marginTop: 'auto',
						}}
					>
						<Button onClick={handleCardClick} size='small'>
							<Comment />
							<Typography variant='body2' sx={{ marginLeft: '4px' }}>
								{workout.comments.length}
							</Typography>
						</Button>
						{getCurrentUser()?.role == 'coach' &&
							localStorage.getItem('token') && (
								<IconButton
									sx={{ marginLeft: 'auto' }}
									onClick={handleMenuClick}
								>
									<MoreHoriz />
								</IconButton>
							)}
					</CardActions>
				</Box>
			</Box>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				{!workout.voice_content && (
					<MenuItem onClick={handleEdit}>Редагувати</MenuItem>
				)}

				<MenuItem onClick={handleDelete}>Видалити</MenuItem>
			</Menu>
		</Card>
	)
}
