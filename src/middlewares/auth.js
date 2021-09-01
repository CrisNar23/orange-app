import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Check if an authorization token exist in the request
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']

    if (!token) return res.status(401).json({ message: 'No token provided' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.id

    const user = await User.findById(req.userId, { password: 0 })

    if (!user) return res.status(404).json({ message: 'User not found' })

    next()
  } catch (error) {
    console.error(error)
    if (error.expiredAt) {
      return res.status(401).json({ message: 'Unauthorized. Your token has exired at: ' + error.expiredAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' }) })
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }
}
