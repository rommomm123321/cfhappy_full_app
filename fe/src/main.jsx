import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/home'
import { Store } from './pages/store'
import { Workout } from './pages/workout'
import { NotFound } from './pages/404'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Map } from './pages/map'
import { Layout } from './components/Layout'
import './index.css'
import { LoaderProvider } from './components/LoaderContext'
import { WorkoutDetails } from './pages/workout_details'
import FloatingCartButton from './components/FloatingCartButton'
import { Cart } from './pages/cart'
import { Wod } from './pages/wod'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: '/store',
		element: (
			<Layout>
				<Store />
			</Layout>
		),
	},
	{
		path: '/workout',
		element: (
			<Layout>
				<Workout />
			</Layout>
		),
	},
	{
		path: '/workout/:id',
		element: (
			<Layout>
				<WorkoutDetails />
			</Layout>
		),
	},
	{
		path: '/map',
		element: (
			<Layout>
				<Map />
			</Layout>
		),
	},
	{
		path: '/cart',
		element: (
			<Layout>
				<Cart />
			</Layout>
		),
	},
	{
		path: '/wod',
		element: (
			<Layout>
				<Wod />
			</Layout>
		),
	},

	{
		path: '*',
		element: (
			<Layout>
				<NotFound />
			</Layout>
		),
	},
])

let theme = createTheme({
	palette: {
		mode: 'dark',
	},
	typography: {
		h1: {
			fontSize: '4rem',
			fontWeight: 'bold',
			'@media (max-width:600px)': {
				fontSize: '2.5rem',
			},
		},
		h3: {
			fontSize: '2.5rem',
			fontWeight: 'bold',
			'@media (max-width:600px)': {
				fontSize: '1.75rem',
			},
		},
	},
})

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<LoaderProvider>
				<RouterProvider router={router} />
			</LoaderProvider>
		</ThemeProvider>
	</StrictMode>
)
