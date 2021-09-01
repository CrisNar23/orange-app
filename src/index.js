import dotenv from 'dotenv'
import express from 'express'
import dbConnection from './config/database.js'

import { initialSetup } from './utils/initialSetup.js'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'
import bonusRoutes from './routes/bonus.routes.js'

// Create a new express server
const app = express()

// Set environment variables
dotenv.config()

// Database connection
dbConnection()

// Create predefined roles
initialSetup()

// Parse request to JSON
app.use(express.json())

// Main route to manage auth
app.use('/auth', authRoutes)

// Main route to manage users
app.use('/users', userRoutes)

// Main route to manage products
app.use('/products', productRoutes)

// Main route to manage bonus
app.use('/bonus', bonusRoutes)

// Listening requests into defined port
app.listen(process.env.PORT, () =>
  console.log(
    `Server listening on port: ${process.env.PORT} ->`,
    new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })
  )
)
