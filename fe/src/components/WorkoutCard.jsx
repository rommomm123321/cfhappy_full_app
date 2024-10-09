import { ThumbUp, Comment, MoreHoriz } from '@mui/icons-material'
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Divider,
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
			}}
		>
			<CardActionArea>
				<CardContent onClick={handleCardClick}>
					<Typography gutterBottom variant='h5' component='div'>
						{dayjs(workout?.title).format('DD-MM-YYYY')}
					</Typography>
					<Box
						variant='body2'
						sx={{
							color: 'text.secondary',
							display: 'block',
							maxHeight: '400px',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
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
				<Divider />
				<CardActions
					sx={{ justifyContent: 'flex-end', padding: '5px', marginTop: 'auto' }}
				>
					<Button onClick={handleCardClick}>
						<Comment />
						<Typography variant='body2' sx={{ marginLeft: '4px' }}>
							{workout.comments.length}
						</Typography>
					</Button>
					{getCurrentUser()?.role == 'coach' && (
						<IconButton sx={{ marginLeft: 'auto' }} onClick={handleMenuClick}>
							<MoreHoriz />
						</IconButton>
					)}
				</CardActions>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleEdit}>Редагувати</MenuItem>
				<MenuItem onClick={handleDelete}>Видалити</MenuItem>
			</Menu>
		</Card>
	)
}
