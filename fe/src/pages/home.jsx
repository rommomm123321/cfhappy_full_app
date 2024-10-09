import {
	Alert,
	Box,
	Button,
	InputAdornment,
	Snackbar,
	Stack,
	TextField,
	Typography,
	useMediaQuery,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'

import testVideo from '../assets/test_video_3.mp4'
import { useEffect, useRef, useState } from 'react'
import { useLoader } from '../hooks/useLoader'
import { RandomIconsBackground } from '../components/RandomIconsBackground'
import { Person, Phone } from '@mui/icons-material'
import { sendFlyToTrainingAsync } from '../config/helpers'

const textArray = [
	'Якщо штанга не падає на підлогу, отже, ти все робиш правильно!',
	'Ти не у відпустці, а в режимі набору суперсили!',
	'Не відкладай на завтра те, що можеш підняти сьогодні!',
	'Почни тренування сьогодні, щоб завтра бігти за піцою ще швидше!',
	'Біжи так, ніби за тобою женеться останній шматок піци!',
	'Якщо ти не можеш віджатися — просто зроби вигляд, що це йога!',
	'Тренуйся з розумом: менше бігай — більше смійся!',
	'Тренування? Ні, я просто заблукав у спортзалі!',
	'Я не втомився, я просто практикуюся в медитації на підлозі!',
]

export const Home = () => {
	const [index, setIndex] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [videoError, setVideoError] = useState(false) // Состояние для ошибок видео
	const videoRef = useRef(null)
	const { showLoader, hideLoader } = useLoader()

	const isMobile = useMediaQuery('(max-width:600px)')

	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [snackbarMessage, setSnackbarMessage] = useState('')
	const [snackbarSeverity, setSnackbarSeverity] = useState('success')

	const handleFlyToTraining = async () => {
		// Validation: Check if fields are empty

		if (!name || !phone) {
			setSnackbarMessage('Будь ласка, заповніть всі поля.')
			setSnackbarSeverity('error')
			setSnackbarOpen(true)
			return // Stop execution if validation fails
		}

		const data = {
			name: name,
			phone: phone,
		}

		try {
			const response = await sendFlyToTrainingAsync(data)

			if (response.status == 201) {
				// Set flag in local storage
				localStorage.setItem('formSubmitted', 'true')

				// Set success message and open Snackbar
				setSnackbarMessage(
					'Ти точно не пошкодуєш! Найближчим часом з вами зв’яжеться наш оператор.'
				)
				setSnackbarSeverity('success')
				setSnackbarOpen(true)

				// Clear input fields
				setName('')
				setPhone('')
			} else {
				console.error('Failed to submit:', response.statusText)
				setSnackbarMessage('Помилка відправки. Спробуйте ще раз.')
				setSnackbarSeverity('error')
				setSnackbarOpen(true)
			}
		} catch (error) {
			console.error('Error submitting form:', error)
			setSnackbarMessage('Сталася помилка. Спробуйте ще раз.')
			setSnackbarSeverity('error')
			setSnackbarOpen(true)
		}
	}

	const isFormSubmitted = localStorage.getItem('formSubmitted') === 'true'

	// Snackbar close handler
	const handleSnackbarClose = () => {
		setSnackbarOpen(false)
	}

	// Check if the form has been submitted previously

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex(prevIndex => (prevIndex + 1) % textArray.length)
		}, 4000)

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.muted = true
			videoRef.current.play().catch(() => {
				// Если браузер блокирует видео, установить ошибку
				setVideoError(true)
				hideLoader()
			})
		}
	}, [videoRef])

	const handleVideoLoadStart = () => {
		setIsLoading(true)
		showLoader()
	}

	const handleVideoCanPlay = () => {
		setIsLoading(false)
		hideLoader()
	}

	const handleVideoError = () => {
		setVideoError(true) // Устанавливаем ошибку если видео не может быть воспроизведено
		hideLoader()
	}

	const handleVideoPlay = () => {
		setVideoError(false) // Если видео воспроизвелось, сбрасываем ошибку
		hideLoader()
	}

	return (
		<Box position='relative' width='100vw' height='100vh'>
			{videoError || isMobile ? (
				// Если видео не воспроизводится или устройство мобильное — показываем RandomIconsBackground

				<Box
					ref={videoRef}
					component='video'
					width='100vw'
					height='100vh'
					loop
					autoPlay
					muted
					playsInline
					onWaiting={handleVideoLoadStart}
					onCanPlay={handleVideoCanPlay}
					onError={handleVideoError} // Обработка ошибок видео
					onPlay={handleVideoPlay} // Успешное воспроизведение
					style={{
						objectFit: 'cover',
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: -1,
					}}
				>
					<source src={testVideo} type='video/mp4' />
					Your browser does not support the video tag.
				</Box>
			) : (
				<RandomIconsBackground />
			)}

			<Box
				position='absolute'
				sx={{
					top: {
						xs: '30%', // 20% from the top on extra-small screens (mobile)
						sm: '30%', // 25% from the top on small screens
						md: '33%', // 30% from the top on medium screens
						lg: '40%', // 35% from the top on large screens
						// xl: '50%', // 40% from the top on extra-large screens
					},
				}}
				left='5%'
				right='7%'
				zIndex={1}
			>
				<AnimatePresence>
					<motion.div
						key={index}
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Typography
							textTransform='uppercase'
							variant='h1'
							component='h1'
							fontWeight='bold'
							maxWidth='90%'
							sx={{
								whiteSpace: 'normal',
							}}
						>
							{textArray[index]}
						</Typography>
					</motion.div>
				</AnimatePresence>
			</Box>
			{!isFormSubmitted && (
				<Box
					position='absolute'
					bottom='10%' // Adjust if needed
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						zIndex: 1,
						width: '300px', // Fixed width for the form
						padding: 2,
						borderRadius: 2,
						boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)', // Enhanced shadow for a more elegant look
						backgroundColor: '#0000009c',
						left: {
							xs: '50%', // Center for extra-small screens
						},
						transform: {
							xs: 'translate(-50%, 0)', // Adjust for smaller screens
						},
					}}
				>
					<TextField
						fullWidth
						placeholder="Ім'я"
						variant='outlined'
						margin='normal'
						size='small'
						sx={{ marginBottom: 0.5 }}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Person />
								</InputAdornment>
							),
						}}
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<TextField
						fullWidth
						placeholder='Номер телефону'
						variant='outlined'
						margin='normal'
						size='small'
						sx={{ marginBottom: 1.5 }}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Phone />
								</InputAdornment>
							),
						}}
						value={phone}
						onChange={e => setPhone(e.target.value)}
					/>
					<Button
						size='small'
						fullWidth
						variant='outlined'
						color='info'
						onClick={() => handleFlyToTraining()}
					>
						ЗАЛЕТІТИ НА ТРЕНУВАННЯ
					</Button>
				</Box>
			)}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={4000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position
			>
				<Alert
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
					sx={{ width: '100%' }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Box>
	)
}
