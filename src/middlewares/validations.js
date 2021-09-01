import Role from '../models/Role.js'
import User from '../models/User.js'

// Check if a role exist in the database
export const checkRolesExist = async (req, res, next) => {
  const userRoles = req.body.roles

  try {
    const foundRoles = await Role.find()
    const roles = []

    foundRoles.forEach((role) => {
      roles.push(role.name)
    })

    if (userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        if (!roles.includes(userRoles[i])) {
          return res.status(400).json({
            message: `Role ${userRoles[i]} doesn't exist`
          })
        }
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }

  next()
}

// Check if a user already exists in the database
export const userDuplicate = async (req, res, next) => {
  const { username, email } = req.body

  try {
    const userFound = await User.findOne({ username })
    if (userFound) {
      return res.status(400).json({ message: 'Username already registered. Try again with another username' })
    }

    const emailFound = await User.findOne({ email })
    if (emailFound) {
      return res.status(400).json({ message: 'Email already registered. Try again with another email' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }

  next()
}

// Check if a user has the admin role
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles } })

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        next()
        return
      }
    }

    return res.status(403).json({ message: 'Role admin is required' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Check format email and password
export const credentialsValidation = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\]!@#?])(?=.{10,})/

    if (!emailRegEx.test(email)) {
      return res
        .status(400)
        .json({
          message:
            'Email format invalid. Your email must be like something@mail.com',
          status: 400
        })
    }

    if (!passwordRegEx.test(password)) {
      return res
        .status(400)
        .json({
          message:
            'Password format invalid. Your password must have at least 10 characters, one lowercase letter, one uppercase letter and one of the following characters: !, @, # or ]',
          status: 400
        })
    }
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
