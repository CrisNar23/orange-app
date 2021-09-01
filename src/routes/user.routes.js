import { Router } from 'express'
import { createUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/auth.js'
import { checkRolesExist, isAdmin } from '../middlewares/validations.js'

const router = Router()

// Route to create a new user logged as admin
router.post('/', [verifyToken, isAdmin, checkRolesExist], createUser)

export default router
