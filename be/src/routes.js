const express = require('express')
const { authenticateUser, getMe } = require('../controllers/authController')
const authenticateJWT = require('../middleware/authMiddleware')
const {
	createPost,
	getAllPosts,
	getPostById,
	updatePost,
	deletePost,
} = require('../controllers/postsController')
const {
	createComment,
	getCommentsForPost,
	getCommentById,
	updateComment,
	deleteComment,
} = require('../controllers/commentController')
const { getAllCrossfitTerms } = require('../controllers/termController')
const {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
} = require('../controllers/productController')
const {
	createOrder,
	sendFlyToTraining,
} = require('../controllers/orderController')

const router = express.Router()

router.post('/auth', authenticateUser)
router.post('/me', authenticateJWT, getMe)
router.get('/posts', getAllPosts)
router.post('/posts', authenticateJWT, createPost)
router.get('/posts/:id', getPostById)
router.put('/posts/:id', authenticateJWT, updatePost)
router.delete('/posts/:id', authenticateJWT, deletePost)

router.get('/terms', authenticateJWT, getAllCrossfitTerms)

// router.get('/comments/post/:postId', getCommentsForPost)
router.post('/comments', authenticateJWT, createComment)
// router.get('/comments/:id', getCommentById)
router.put('/comments/:id', authenticateJWT, updateComment)
router.delete('/comments/:id', authenticateJWT, deleteComment)

router.get('/products', getAllProducts)
router.post('/products', authenticateJWT, createProduct)
router.get('/products/:id', getProductById)
router.put('/products/:id', authenticateJWT, updateProduct)
router.delete('/products/:id', authenticateJWT, deleteProduct)

router.post('/order', createOrder)
router.post('/fly-to-training', sendFlyToTraining)
module.exports = router
