import { useEffect, useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import CrossFit from '../assets/CrossFit.svg?react'

export const RandomIconsBackground = () => {
	// Create a state to store icon positions and sizes
	const [icons, setIcons] = useState([])
	const isMobile = useMediaQuery('(max-width:600px)')

	// This effect will run once on mount to generate random positions and sizes for icons
	useEffect(() => {
		const generateIcons = () => {
			return Array.from({ length: 15 }).map(() => ({
				top: `${Math.random() * 90}%`,
				left: `${Math.random() * 90}%`,
				bottom: `${Math.random() * 90}%`,
				width: `${Math.random() * isMobile ? 60 : 80 + 20}px`,
				opacity: Math.random() * 0.2 + 0.4,
			}))
		}

		setIcons(generateIcons)
	}, [isMobile])

	return (
		<Box
			sx={{
				backgroundColor: '#121212',
				position: 'fixed', // Задаем фиксированное положение для покрытия всей страницы
				top: 0,
				left: 0,
				right: 0,
				bottom: 0, // Полностью покрывает страницу, включая всю прокрученную область
				width: '100%',
				height: '100%', // Используйте высоту 100% для охвата всей видимой области
				zIndex: -1,
				overflow: 'hidden',
			}}
		>
			{/* Scatter CrossFit icons based on state */}
			{icons.map((icon, idx) => (
				<CrossFit
					key={idx}
					style={{
						zIndex: 0,
						position: 'absolute',
						top: icon.top,
						left: icon.left,
						width: icon.width,
						height: 'auto',
						opacity: icon.opacity,
					}}
				/>
			))}
		</Box>
	)
}
