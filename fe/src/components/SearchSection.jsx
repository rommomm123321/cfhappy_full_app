import { useState } from 'react'
import { Box, Container, TextField, Button, Grid2 } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'

export const SearchSection = ({ setQueryParams }) => {
	const [searchText, setSearchText] = useState('')
	const [selectedDate, setSelectedDate] = useState()

	const handleSearch = () => {
		const formattedDate = selectedDate
			? dayjs(selectedDate).format('YYYY-MM-DD')
			: null
		setQueryParams({ title: formattedDate, content: searchText })
	}
	return (
		<Container
			maxWidth='lg'
			sx={{
				padding: '0',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Box
					component='form'
					id='archiveFormSearch'
					noValidate
					autoComplete='off'
				>
					<Grid2
						spacing={3}
						container
						sx={{
							justifyContent: 'center',
							alignItems: 'center',
							padding: 2,
							borderRadius: 2,
							boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)', // Enhanced shadow for a more elegant look
							backgroundColor: '#0000009c',
						}}
					>
						<Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
							<TextField
								id='textFilter'
								label='Пошук Тренування'
								variant='outlined'
								fullWidth
								value={searchText}
								onChange={e => setSearchText(e.target.value)}
								aria-label='Text Search for WODs'
								size='small'
							/>
						</Grid2>
						<Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
							<DatePicker
								label='Оберіть Дату'
								slotProps={{
									textField: {
										fullWidth: true,
										size: 'small',
									},
								}}
								defaultValue={null}
								value={selectedDate}
								onChange={newValue => setSelectedDate(newValue)}
								renderInput={params => (
									<TextField
										size='small'
										{...params}
										fullWidth
										variant='outlined'
										aria-label='Date Picker'
									/>
								)}
							/>
						</Grid2>
						<Grid2 size={{ xs: 12, sm: 2.5, md: 2.5 }}>
							<Button
								variant='contained'
								color='secondary'
								fullWidth
								startIcon={<SearchIcon />}
								onClick={handleSearch}
								aria-label='Search'
								size='small'
							>
								Шукати
							</Button>
						</Grid2>
					</Grid2>
				</Box>
			</LocalizationProvider>
		</Container>
	)
}
