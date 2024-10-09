import { Box, Typography } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'

import testVideo from '../assets/test_video_3.mp4'
import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'

const textArray = [
	'Якщо штанга не падає на підлогу, отже, ти все робиш правильно!',
	'Ти не у відпустці, а в режимі набору суперсили!',
	'Не відкладай на завтра те, що можеш підняти сьогодні!',
	'Почни тренування сьогодні, щоб завтра бігти за піцою ще швидше!',
	'Займайся сьогодні, щоб бути готовим до всіх несподіваних розтяжок завтра!',
	'Твоє тіло — храм, але іноді йому потрібен ремонт і хороша розминка!',
	'Не важливо, скільки ти піднімеш — головне, щоб було видно зусилля на обличчі!',
	'Біжи так, ніби за тобою женеться останній шматок піци!',
	'Якщо ти не можеш віджатися — просто зроби вигляд, що це йога!',
	'Прокачайся сьогодні, щоб завтра не померти від підйому на другий поверх!',
	'Тренуйся з розумом: менше бігай — більше смійся!',
]

export const Home = () => {
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex(prevIndex => (prevIndex + 1) % textArray.length)
		}, 4000)

		return () => clearInterval(interval)
	}, [])

	return (
		<Box position='relative' width='100vw' height='100vh'>
			<Box
				component='video'
				width='100vw'
				height='100vh'
				loop
				autoPlay
				// muted
				style={{
					objectFit: 'contain',
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: -1,
				}}
			>
				<source src={testVideo} type='video/mp4' />
				Your browser does not support the video tag.
			</Box>

			<Box position='absolute' top='40%' left='10%' right='10%' zIndex={1}>
				<AnimatePresence>
					<motion.div
						key={index}
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						// exit={{ opacity: 0, x: 100 }}
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
			{/* <Box position='absolute' top='70%' left='10%' right='10%' zIndex={1}>
				CrossFit is a fitness program that produces measurable outcomes through
				lifestyle changes, centered on training and nutrition. Workouts consist
				of constantly varied, high-intensity, functional movements, and are most
				fun and effective among friends at a local CrossFit gym.
			</Box> */}
		</Box>
	)
}
