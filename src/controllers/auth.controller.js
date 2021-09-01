import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Role from '../models/Role.js'

// Create a new user account
export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body

  try {
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password)
    })
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } })
      newUser.roles = foundRoles.map((role) => role._id)
    } else {
      const role = await Role.findOne({ name: 'standard' })
      newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: 1200
    })

    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Allow to sign in into application
export const signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await User.findOne({ email }).populate('roles')

    if (!userFound) {
      return res
        .status(404)
        .json({ message: 'User not found. Verify your email and try again' })
    }

    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    )

    if (!matchPassword) {
      return res
        .status(401)
        .json({
          token: null,
          message: 'Invalid password. Verify your password and try again'
        })
    }

    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
      expiresIn: 1200
    })

    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
