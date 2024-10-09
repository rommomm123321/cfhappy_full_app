import React, { useState } from 'react'
import {
	Box,
	Typography,
	Avatar,
	Paper,
	Grid,
	Grid2,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getCurrentUser } from '../config/helpers'
import { MoreHoriz } from '@mui/icons-material'
import CrossFit from '../assets/CrossFit.svg'

dayjs.extend(relativeTime)

export const Comment = ({
	comment,
	setIsEdit,
	setEditableData,
	handleDeleteComment,
}) => {
	const [anchorEl, setAnchorEl] = useState(null)

	const handleMenuClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleEdit = () => {
		setIsEdit(true)
		setEditableData(comment)
		handleMenuClose()
		const editorElement = document.getElementById('commentEditor')
		if (editorElement) {
			editorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	const handleDelete = async () => {
		await handleDeleteComment(comment.id)
		handleMenuClose()
	}

	return (
		<Box sx={{ mb: 2, mt: 2, pl: comment.parentId ? 4 : 0 }}>
			<Paper
				sx={{
					padding: '12px',
					marginBottom: '10px',
					boxShadow: 2,
					transition: '0.3s',
					position: 'relative',
				}}
			>
				<Grid2 container wrap='nowrap' spacing={1} flexDirection='column'>
					<Box display='flex' alignItems='center'>
						<Grid2 item>
							<Avatar
								alt={comment.user.name}
								src={CrossFit}
								sx={{ marginRight: 2 }}
							/>
						</Grid2>
						<Grid2 item>
							<Typography variant='h6' sx={{ margin: 0 }}>
								{comment.user.name}
							</Typography>
							<Typography variant='caption' color='gray' sx={{ mb: 1 }}>
								розміщено {dayjs(comment.createdAt).fromNow()}
							</Typography>
						</Grid2>
						{getCurrentUser()?.id == comment.user.id && (
							<IconButton sx={{ marginLeft: 'auto' }} onClick={handleMenuClick}>
								<MoreHoriz />
							</IconButton>
						)}
					</Box>

					<Box
						sx={{
							marginTop: 1,
							wordBreak: 'break-word',
							overflowWrap: 'anywhere',
						}}
					>
						<Typography
							variant='body1'
							dangerouslySetInnerHTML={{
								__html: comment?.content,
							}}
						/>
					</Box>
				</Grid2>

				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					// disableScrollLock
				>
					<MenuItem onClick={handleEdit}>Редагувати</MenuItem>
					<MenuItem onClick={handleDelete}>Видалити</MenuItem>
				</Menu>
			</Paper>
		</Box>
	)
}
