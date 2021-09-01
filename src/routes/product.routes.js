import { Router } from 'express'
import {
  createProduct,
  deleteAllPrivateProducts,
  deletePrivateProductsById,
  editPrivateProducts,
  likeToPublicProducts,
  listOfLikes,
  readOwnProducts,
  readPublicProducts
} from '../controllers/product.controller.js'
import { verifyToken } from '../middlewares/auth.js'

const router = Router()

// Route to create a new product
router.post('/', verifyToken, createProduct)

// Route to get a list of products
router.get('/', verifyToken, readPublicProducts)

// Route to get a list of likes of public products
router.get('/likes', verifyToken, listOfLikes)

// Route to get products by user ID
router.get('/:userId', verifyToken, readOwnProducts)

// Route to update an product by ID
router.put('/:userId/:productId', verifyToken, editPrivateProducts)

// Route to delete an product by ID
router.delete('/:userId/:productId', verifyToken, deletePrivateProductsById)

// Route to delete all products
router.delete('/:userId', verifyToken, deleteAllPrivateProducts)

// Route to give a like to public products
router.patch('/:productId', verifyToken, likeToPublicProducts)

export default router
