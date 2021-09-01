import { Router } from 'express'
import { bonus } from '../controllers/bonus-controller.js'

const router = Router()

// Route to fetch endpoint civilizations
router.get('/', bonus)

export default router
