import { motion } from 'framer-motion'
import CrossFit from '../assets/CrossFit.svg?react'
import { useEffect } from 'react'

export const Loader = ({ message }) => {
	useEffect(() => {
		document.body.classList.add('no-scroll')
		return () => {
			document.body.classList.remove('no-scroll')
		}
	}, [])
	const loaderVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	}

	const svgVariants = {
		// Pulse animation
		animate: {
			scale: [1, 1.1, 1], // Pulse effect (scale up and down)
			transition: {
				duration: 1,
				ease: 'easeInOut',
				repeat: Infinity, // Repeat the animation infinitely
			},
		},
	}

	return (
		<div className='loader-overlay'>
			<motion.div
				initial='hidden'
				animate='visible'
				variants={loaderVariants}
				className='loader'
			>
				<motion.div variants={svgVariants} animate='animate'>
					<CrossFit />
				</motion.div>
			</motion.div>
		</div>
	)
}
