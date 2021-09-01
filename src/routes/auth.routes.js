import { Router } from 'express'
import { signIn, signUp } from '../controllers/auth.controller.js'
import { credentialsValidation, userDuplicate } from '../middlewares/validations.js'

const router = Router()

// Route to create a new account into the application verifying if a user already exist
router.post('/signup', credentialsValidation, userDuplicate, signUp)

// Route to sign in into application
router.post('/signin', credentialsValidation, signIn)

export default router
