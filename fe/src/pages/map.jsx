import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import {
	Container,
	Typography,
	Box,
	List,
	ListItem,
	ListItemText,
	Paper,
	Button,
	Grid2,
	Grid,
	styled,
	Divider,
} from '@mui/material'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Mail, Numbers, Phone, Place } from '@mui/icons-material'

// Координаты местоположения спортзала
const gymLocation = [47.83981620912479, 35.130552502496656]

const trainers = [
	{ name: 'Иван Иванов', phone: '+380123456789', email: 'ivan@fitness.com' },
	{ name: 'Анна Смирнова', phone: '+380987654321', email: 'anna@fitness.com' },
]

// Настройка иконки для маркера (почти черный)
const icon = new L.Icon({
	iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
	shadowSize: [41, 41],
	className: 'custom-black-marker',
})

const handleRouteClick = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords
				// Формируем URL с маршрутом от текущего местоположения до спортзала
				const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${gymLocation[0]},${gymLocation[1]}`
				window.open(googleMapsUrl, '_blank')
			},
			error => {
				alert(
					'Не удалось получить текущее местоположение. Проверьте настройки геолокации.'
				)
			}
		)
	} else {
		alert('Геолокация не поддерживается вашим браузером.')
	}
}

export const Map = () => {
	return (
		<Box padding={{ xs: '7rem 0rem 5rem 0rem', sm: '7rem 2rem 5rem 2rem' }}>
			<Box sx={{ padding: 0, margin: 0 }}>
				<Grid2
					container
					display='flex'
					justifyContent='space-between'
					spacing={2}
				>
					<Grid2 size={{ xs: 12, sm: 6, md: 5 }} marginBottom='20px'>
						<Typography
							whiteSpace='break-spaces'
							variant='h4'
							gutterBottom
							textTransform='uppercase'
							padding='0px 5px'
							sx={{ wordBreak: 'break-word' }}
							align='center'
						>
							Інформація та Контакти
						</Typography>

						<MapContainer
							style={{
								height: '400px',
								width: '100%', // Full width for mobile
								maxWidth: '700px', // Max width for desktop
							}}
							center={gymLocation}
							zoom={16}
							scrollWheelZoom={false}
							zoomControl={true}
						>
							<TileLayer
								url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							/>
							<Marker position={gymLocation} icon={icon} />
						</MapContainer>
					</Grid2>

					<Grid2 size={{ xs: 12, sm: 6, md: 7 }}>
						<Paper
							sx={{
								borderRadius: {
									xs: 0,
								},
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'start',
							}}
							style={{ padding: '15px' }}
						>
							{/* <Typography variant='h5'>Контакты тренеров</Typography> */}
							<Button
								color='info'
								startIcon={<Place />}
								target='_blank'
								href='https://www.google.com/maps/place/CrossFit+Happy/@47.8396294,35.1302128,15z/data=!4m6!3m5!1s0x40dc672b2787a3d7:0x3ab7d1dcfa5064eb!8m2!3d47.8396294!4d35.1302128!16s%2Fg%2F11gjm8ttnw?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D'
							>
								вулиця Леоніда Жаботинського, Запоріжжя, Запорізька область,
								69061
							</Button>
							<Button
								color='success'
								startIcon={<Mail />}
								target='_blank'
								href='mailto:crossfithappy@gmail.com'
							>
								crossfithappy@gmail.com
							</Button>
							<Button
								color='inherit'
								startIcon={<Phone />}
								target='_blank'
								href='https://t.me/Happy_crossfit'
							>
								+38 (066) 121-08-64
							</Button>
						</Paper>

						<Paper
							sx={{
								borderRadius: {
									xs: 0,
								},
							}}
							style={{ padding: '15px', marginTop: '20px' }}
						>
							<Typography variant='h5' textTransform='uppercase'>
								Графік роботи
							</Typography>
							<Divider style={{ margin: '10px 0' }} />
							<List>
								{/* Понеділок, Середа, П'ятниця */}
								<ListItem>
									<ListItemText
										primary="Понеділок, Середа, П'ятниця"
										secondary='06:00, 07:00, 17:00, 18:00, 19:00'
									/>
								</ListItem>
								<Divider />

								{/* Вівторок, Четвер */}
								<ListItem>
									<ListItemText
										primary='Вівторок, Четвер'
										secondary='06:00, 07:00'
									/>
								</ListItem>
								<Divider />

								{/* Субота */}
								<ListItem>
									<ListItemText primary='Субота' secondary='07:00' />
								</ListItem>
								<Divider />

								{/* Неділя */}
								<ListItem>
									<ListItemText primary='Неділя' secondary='Вихідний' />
								</ListItem>
							</List>
						</Paper>
					</Grid2>
				</Grid2>
			</Box>
		</Box>
	)
}
