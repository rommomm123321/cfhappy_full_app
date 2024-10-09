import { AppBar, Box, Toolbar, IconButton, Stack } from '@mui/material'
import {
	FitnessCenter,
	Map,
	LocalGroceryStore,
	VpnKey,
	Place,
	School,
} from '@mui/icons-material'
import CrossFit from '../assets/CrossFit.svg?react'
import { NavLink, useMatch } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AuthModal } from './AuthModal'
export const Header = () => {
	const [open, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const headerMenu = [
		{
			title: '',
			icon: <FitnessCenter />,
			path: '/workout',
		},
		{
			title: '',
			icon: <School />,
			path: '/wod',
		},
		{
			title: '',
			icon: <Place />,
			path: '/map',
		},
		{
			title: '',
			icon: <LocalGroceryStore />,
			path: '/store',
		},
	]

	return (
		<AppBar
			position='fixed'
			sx={{
				background: useMatch('/') ? 'transparent' : '#121212d1',
				boxShadow: 'none',
				borderBottom: useMatch('/')
					? 'none'
					: '1px solid rgba(255, 255, 255, 0.12)',
			}}
		>
			<Toolbar sx={{ alignItems: useMatch('/') ? 'start' : 'center' }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						marginTop: '10px',
					}}
				>
					<NavLink to='/'>
						<CrossFit
							style={{
								color: 'white',
								width: useMatch('/') ? '120px' : '75px',
								height: useMatch('/') ? '120px' : '75px',
							}}
						/>
					</NavLink>
				</Box>

				<Stack
					sx={{
						gap: {
							xs: 1,
							sm: 2,
						},
						display: 'flex',
						flexDirection: 'row',
						marginLeft: 'auto',
						paddingTop: useMatch('/') ? '26px' : 'none',
					}}
				>
					{headerMenu.map((item, key) => {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						const isActive = !!useMatch(item.path)

						return (
							<NavLink
								key={key}
								to={item.path}
								style={{
									textDecoration: 'none',
									color: 'inherit',
								}}
							>
								<IconButton
									color='inherit'
									sx={{
										backgroundColor: isActive
											? 'rgba(255, 255, 255, 0.08)'
											: 'transparent',
									}}
								>
									{item.icon}
								</IconButton>
							</NavLink>
						)
					})}
					{!localStorage.getItem('token') && (
						<IconButton color='inherit' onClick={() => handleOpen()}>
							<VpnKey />
						</IconButton>
					)}
				</Stack>
			</Toolbar>
			<AuthModal open={open} handleClose={handleClose} />
		</AppBar>
	)
}
