import React, { useEffect, useState } from 'react'

import { Box, Button, useMediaQuery } from '@mui/material'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import FroalaEditor from 'react-froala-wysiwyg'
import '../index.css'
import {
	sendPost,
	sendComment,
	updateComment,
	updatePost,
} from '../config/helpers'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import '../editorStyles.css'
// eslint-disable-next-line no-unused-vars
import { uploadFile } from 'react-s3'

import { Buffer } from 'buffer'
window.Buffer = Buffer

export const Editor = ({
	setLoad,
	isComment = false,
	isEdit = false,
	editableData = null,
	setIsEdit = null,
	page = null,
	setPage = null,
}) => {
	const [content, setContent] = useState('')

	const { id } = useParams()
	const isMobile = useMediaQuery('(max-width:600px)')

	const handleSend = async () => {
		try {
			if (isComment) {
				await sendComment(content, id)
			} else {
				await sendPost(content)
			}
			setContent('')
			if (page !== 1) {
				setPage(1)
			}
			setLoad(prev => !prev)
		} catch (error) {
			console.error('Error sending content:', error)
		}
	}

	const handleUpdate = async () => {
		try {
			if (isComment && isEdit && editableData) {
				await updateComment(content, editableData?.id)
			} else {
				await updatePost(content, editableData.title, editableData?.id)
			}
			setContent('')
			setLoad(prev => !prev)
			handleCancel()
		} catch (error) {
			console.error('Error updating content:', error)
		}
	}

	useEffect(() => {
		// Загружаем черновик из localStorage
		const draftKey = isComment ? 'draft_comment' : 'draft_post'
		const savedDraft = localStorage.getItem(draftKey)
		if (savedDraft) {
			setContent(savedDraft)
		}

		// Устанавливаем интервал для автоматической очистки черновиков
		const intervalId = setInterval(() => {
			localStorage.removeItem(draftKey) // Удаляем черновик раз в час
			setContent('') // Очистка содержимого редактора
		}, 3600000) // 1 час

		return () => clearInterval(intervalId) // Очистка интервала при размонтировании компонента
	}, [isComment])

	useEffect(() => {
		// Сохраняем черновик в localStorage при изменении содержимого
		const draftKey = isComment ? 'draft_comment' : 'draft_post'
		const froalaEditorContent = `<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>`

		if (content === froalaEditorContent) {
			// Очищаем контент и localStorage
			localStorage.removeItem(draftKey) // Удаляем из localStorage
			setContent('')
		} else {
			// Сохраняем содержимое в localStorage
			localStorage.setItem(draftKey, content)
		}
	}, [content, isComment])

	const handleCancel = () => {
		setContent('')
		setIsEdit(false)
	}

	// const clearDraft = () => {
	// 	localStorage.removeItem('draftContent')
	// 	setContent('')
	// }

	// const saveDraft = () => {
	// 	localStorage.setItem('draftContent', content)
	// }

	// useEffect(() => {
	// 	const savedContent = localStorage.getItem('draftContent')
	// 	if (savedContent) {
	// 		setContent(savedContent)
	// 	}
	// }, [])

	// useEffect(() => {
	// 	saveDraft()
	// }, [content])

	useEffect(() => {
		if (isEdit) setContent(editableData.content || '')
	}, [isEdit, editableData])

	useEffect(() => {
		if (isEdit) handleCancel()
	}, [page])

	const toolbarButtons = {
		postButtons: [
			'bold',
			'italic',
			'underline',
			'strikeThrough',
			'subscript',
			'superscript',
			'fontFamily',
			'fontSize',
			'textColor',
			'paragraphFormat',
			'lineHeight',
			'align',
			'formatOL',
			'formatUL',
			'outdent',
			'indent',
			'leftToRight',
			'rightToLeft',
			'insertLink',
			'insertImage',
			'insertTable',
			'emoticons',
			'personalize',
			'insertButton',
			'clearFormatting',
			'selectAll',
			'insertHR',
			'undo',
			'redo',
		],
		commentButtons: [
			'bold',
			'italic',
			'underline',
			'strikeThrough',
			'clearFormatting',
			'insertButton',
			'undo',
			'redo',
		],
	}

	const _S3_BUCKET = process.env.S3_BUCKET
	const _REGION = process.env.REGION
	const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID
	const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY

	return (
		<Box
			display='flex'
			flexDirection='column'
			marginTop='20px'
			id='commentEditor'
		>
			<FroalaEditor
				tag='textarea'
				model={content}
				onModelChange={setContent}
				config={{
					tableStyles: {
						'no-border': 'No border',
					},
					useClasses: false,
					attribution: false,
					toolbarSticky: false,
					charCounterCount: false,
					fontFamilySelection: true,
					fontSizeSelection: true,
					paragraphFormatSelection: true,
					heightMin: 200,
					heightMax: isComment ? 200 : 300,
					linkInsertButtons: [],
					toolbarButtons: isComment
						? toolbarButtons.commentButtons
						: toolbarButtons.postButtons,
					linkList: [],
					imageUpload: true,
					imageDefaultAlign: 'left',
					imageDefaultDisplay: 'inline-block',
					imageAllowedTypes: ['jpeg', 'jpg', 'png'],
					events: {
						'image.beforeUpload': async function (images) {
							const data = new FormData()
							data.append('image', images[0])

							// const config = {
							// 	bucketName: _S3_BUCKET,
							// 	region: _REGION,
							// 	accessKeyId: ACCESS_KEY_ID,
							// 	secretAccessKey: SECRET_ACCESS_KEY,
							// }

							// await uploadFile(images[0], config)
							// 	.then(res =>
							// 		this.image.insert(res.location, null, null, this.image.get())
							// 	)
							// 	.catch(err => console.error(err))

							axios
								.post(
									'https://api.imgbb.com/1/upload?expiration=15552000&key=c8a4ce4d7267fbf90d795a2f17b3c72c',
									data,
									{
										headers: {
											accept: 'application/json',
											'Accept-Language': 'en-US,en;q=0.8',
											'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
										},
									}
								)
								.then(res => {
									this.image.insert(
										res.data.data.image.url,
										null,
										null,
										this.image.get()
									)
								})
								.catch(err => {
									console.log(err)
								})
							return false
						},
					},
				}}
			/>
			{isEdit ? (
				<Box display='flex' justifyContent='end' marginTop='10px'>
					<Button variant='outlined' color='secondary' onClick={handleCancel}>
						Відмінити
					</Button>
					<Button
						variant='contained'
						color='primary'
						onClick={handleUpdate}
						sx={{ marginLeft: '10px' }}
						disabled={!content}
					>
						Оновити
					</Button>
				</Box>
			) : (
				<Box display='flex' justifyContent='flex-end'>
					<Button
						fullWidth={isMobile}
						disabled={!content}
						variant='contained'
						color='primary'
						onClick={handleSend}
						sx={{ marginTop: '10px' }}
					>
						Додати
					</Button>
				</Box>
			)}
		</Box>
	)
}
