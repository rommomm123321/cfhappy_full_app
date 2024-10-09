import { Box } from '@mui/material'
import { Header } from './Header'
import { Footer } from './Footer'
import { useEffect } from 'react'
import { getMe } from '../config/helpers'
import { useLocation } from 'react-router-dom'
import FloatingCartButton from './FloatingCartButton'

// eslint-disable-next-line react/prop-types
export const Layout = ({ children }) => {
	const location = useLocation()

	useEffect(() => {
		;(async () => {
			if (localStorage.getItem('token')) await getMe()
		})()
	}, [location])

	function clearCart() {
		localStorage.removeItem('cart')
		console.log('Корзина очищена')
	}

	setInterval(clearCart, 3600000)

	document.addEventListener('DOMContentLoaded', event => {
		clearCart()
	})

	return (
		<Box>
			<Header />
			<Box>{children}</Box>
			<Footer />
			<FloatingCartButton />
		</Box>
	)
}
