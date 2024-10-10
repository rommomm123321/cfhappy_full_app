import { useEffect, useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import CrossFit from '../assets/CrossFit.svg?react'

export const RandomIconsBackground = () => {
	// Create a state to store icon positions and sizes
	const [icons, setIcons] = useState([])
	const isMobile = useMediaQuery('(max-width:600px)')

	// Function to check if two rectangles overlap
	const checkOverlap = (newIcon, existingIcons) => {
		return existingIcons.some(icon => {
			const newRect = {
				top: (parseFloat(newIcon.top) * window.innerHeight) / 100,
				left: (parseFloat(newIcon.left) * window.innerWidth) / 100,
				width: parseFloat(newIcon.width),
				height: parseFloat(newIcon.width), // assuming square icons for simplicity
			}
			const existingRect = {
				top: (parseFloat(icon.top) * window.innerHeight) / 100,
				left: (parseFloat(icon.left) * window.innerWidth) / 100,
				width: parseFloat(icon.width),
				height: parseFloat(icon.width),
			}

			return !(
				newRect.left + newRect.width < existingRect.left ||
				newRect.left > existingRect.left + existingRect.width ||
				newRect.top + newRect.height < existingRect.top ||
				newRect.top > existingRect.top + existingRect.height
			)
		})
	}

	// This effect will run once on mount to generate random positions and sizes for icons
	useEffect(() => {
		const generateIcons = () => {
			const newIcons = []
			while (newIcons.length < 30) {
				const newIcon = {
					top: `${Math.random() * 90}%`,
					left: `${Math.random() * 90}%`,
					width: `${Math.random() * (isMobile ? 50 : 100) + 20}px`,
					opacity: Math.random() * 0.2 + 0.4,
				}

				// Only add the new icon if it doesn't overlap with existing icons
				if (!checkOverlap(newIcon, newIcons)) {
					newIcons.push(newIcon)
				}
			}
			return newIcons
		}

		setIcons(generateIcons())
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
