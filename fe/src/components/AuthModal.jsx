import {
	Alert,
	Box,
	Button,
	Grid2,
	IconButton,
	Modal,
	Snackbar,
	TextField,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { getToken } from '../config/helpers'

export const AuthModal = ({ open, handleClose }) => {
	const [key, setKey] = useState('')
	const [name, setName] = useState('')
	const [error, setError] = useState(null)

	const handleSend = async () => {
		try {
			const data = await getToken(key, name)
			if (data.status == 200) {
				handleClose()
				setKey('')
				setName('')
				window.location.reload()
			}
		} catch (error) {
			setError(
				'Не вдалося пройти аутентифікацію. Будь ласка, перевірте свої облікові дані.'
			)
			// handleClose()
			console.error('Error sending auth:', error)
		}
	}

	const handleCloseSnackbar = () => {
		setError(null)
	}

	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 300,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
						border: '1px solid #424242',
						position: 'relative',
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
					<Grid2 spacing={2} container sx={{ marginTop: '10px' }}>
						<TextField
							label='Клікуха'
							variant='outlined'
							fullWidth
							value={name}
							type='text'
							onChange={e => setName(e.target.value)}
						/>
						<TextField
							label='Ключ'
							variant='outlined'
							fullWidth
							value={key}
							type='password'
							onChange={e => setKey(e.target.value)}
						/>
					</Grid2>
					<Button
						variant='contained'
						color='success'
						onClick={handleSend}
						fullWidth
						sx={{ mt: 2 }}
						disabled={!key || !name}
					>
						Увійти
					</Button>
				</Box>
			</Modal>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
