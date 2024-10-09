import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
	const navigate = useNavigate()

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				backgroundColor: '#121212',
				color: 'white',
				textAlign: 'center',
				padding: '20px',
			}}
		>
			<Typography variant='h1' sx={{ fontSize: '5rem', fontWeight: 'bold' }}>
				404
			</Typography>
			<Typography variant='h4' sx={{ marginBottom: '20px' }}>
				Упс! Сторінку не знайдено.
			</Typography>
			<Typography variant='body1' sx={{ marginBottom: '40px' }}>
				Сторінка, яку ви шукаєте, не існує або була переміщена.
			</Typography>
			<Button variant='contained' color='warning' onClick={() => navigate('/')}>
				Повернутися на головну сторінку
			</Button>
		</Box>
	)
}
