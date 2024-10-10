import { Box, Divider, Grid2, Pagination, Typography } from '@mui/material'
import { SearchSection } from '../components/SearchSection'
import { Editor } from '../components/Editor'
import { WorkoutCard } from '../components/WorkoutCard'
import { useEffect, useState } from 'react'
import { deletePost, fetchPosts, getCurrentUser } from '../config/helpers'
import { useLoader } from '../hooks/useLoader'

export const Workout = () => {
	const [data, setData] = useState([])
	const [page, setPage] = useState(1)
	const [load, setLoad] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [editableData, setEditableData] = useState(null)
	const [queryParams, setQueryParams] = useState({ title: '', content: '' })
	const [totalPages, setTotalPages] = useState(0)
	const itemsPerPage = 10

	const { showLoader, hideLoader } = useLoader()

	const fetchData = async () => {
		showLoader()

		try {
			// Fetch posts
			const res = await fetchPosts(
				page,
				itemsPerPage,
				queryParams.title,
				queryParams.content
			)

			setTimeout(() => {
				setData(res.posts)
				setTotalPages(res.totalPages)
				hideLoader()
			}, 1000)
		} catch (error) {
			console.error('Error fetching posts:', error)
			hideLoader()
		}
	}

	const handleDeletePost = async id => {
		try {
			await deletePost(id)
			setLoad(prev => !prev)
		} catch (error) {
			console.error('Error deleting content:', error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [page, queryParams, load])

	const handlePageChange = (event, value) => {
		setPage(value)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
	return (
		<Box padding={{ xs: '7rem 0.5rem 5rem 0.5rem', sm: '7rem 2rem 5rem 2rem' }}>
			<Typography
				variant='h4'
				align='center'
				gutterBottom
				textTransform='uppercase'
				fontWeight='bold'
			>
				База тренувань
			</Typography>
			<SearchSection
				setData={setData}
				setTotalPages={setTotalPages}
				setQueryParams={setQueryParams}
			/>
			{getCurrentUser()?.role == 'coach' && localStorage.getItem('token') && (
				<Editor
					setLoad={setLoad}
					page={page}
					editableData={editableData}
					setIsEdit={setIsEdit}
					isEdit={isEdit}
					setPage={setPage}
				/>
			)}

			<Grid2 container spacing={2} paddingTop='20px'>
				{data.map((item, index) => (
					<Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} key={index}>
						<WorkoutCard
							workout={item}
							handleDeletePost={handleDeletePost}
							setIsEdit={setIsEdit}
							setEditableData={setEditableData}
						/>
					</Grid2>
				))}
			</Grid2>
			{data.length > 0 && (
				<Pagination
					size='small'
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
				/>
			)}
		</Box>
	)
}
