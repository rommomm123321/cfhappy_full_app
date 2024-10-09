import {
	Facebook as FacebookIcon,
	Instagram as InstagramIcon,
	YouTube as YouTubeIcon,
	Telegram as TelegramIcon,
} from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useMatch } from 'react-router-dom'

export const Footer = () => {
	return (
		<Box
			display='flex'
			gap={2}
			justifyContent='center'
			alignItems='center'
			position='fixed'
			bottom={0}
			width='100%'
			padding={0.5}
			bgcolor={useMatch('/') ? 'transparent' : '#121212d1'}
			zIndex={1}
			sx={{
				borderTop: useMatch('/')
					? 'none'
					: '1px solid rgba(255, 255, 255, 0.12)',
			}}
		>
			<IconButton
				size='large'
				aria-label='telegram'
				href='https://t.me/Happy_crossfit'
				target='_blank'
			>
				<TelegramIcon />
			</IconButton>
			<IconButton
				size='large'
				aria-label='instagram'
				href='https://www.instagram.com/kirill_plahotnikov/'
				target='_blank'
			>
				<InstagramIcon />
			</IconButton>
			<IconButton
				size='large'
				aria-label='facebook'
				href='https://www.facebook.com/people/%D0%9A%D0%B8%D1%80%D0%B8%D0%BB%D0%BB-%D0%9F%D0%BB%D0%B0%D1%85%D0%BE%D1%82%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2/pfbid02cTkjLakP3raMHrYxPu45mbDAinydf7zwFpJHtwYoNq59rAcy4ymfH9bXiw5V6tEvl/'
				target='_blank'
			>
				<FacebookIcon />
			</IconButton>

			<IconButton
				size='large'
				aria-label='youtube'
				href='https://www.youtube.com/@crossfit'
				target='_blank'
			>
				<YouTubeIcon />
			</IconButton>
		</Box>
	)
}
