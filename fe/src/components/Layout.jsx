import { Box } from '@mui/material'
import { Header } from './Header'
import { Footer } from './Footer'
import { useEffect } from 'react'
import { getMe } from '../config/helpers'
import { useLocation } from 'react-router-dom'
import FloatingCartButton from './FloatingCartButton'
import { RandomIconsBackground } from './RandomIconsBackground'

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
	const location = useLocation()

	useEffect(() => {
		;(async () => {
			if (localStorage.getItem('token')) await getMe()
		})()
	}, [location])

	useEffect(() => {
		const clearCart = () => {
			localStorage.removeItem('cart')
			console.log('Корзина очищена')
		}

		const clearDraft = () => {
			localStorage.removeItem('draft_post')
			localStorage.removeItem('draft_comment')
		}

		// Очищаем корзину и черновики сразу после загрузки страницы
		clearCart()
		clearDraft()

		// Устанавливаем интервал для очистки раз в час
		const intervalId = setInterval(() => {
			clearCart()
			clearDraft()
			const event = new Event('cartUpdated') // Create a new event
			window.dispatchEvent(event)
		}, 3600000)

		// Очищаем интервал при размонтировании компонента
		return () => clearInterval(intervalId)
	}, [])

	return (
		<Box>
			<Header />
			<RandomIconsBackground />
			<Box>{children}</Box>
			<Footer />
			<FloatingCartButton />
		</Box>
	)
}
