import Product from '../models/Product.js'
import Role from '../models/Role.js'
import User from '../models/User.js'

// Create predefined info when starting the application
export const initialSetup = async () => {
  try {
    // Create predefined roles
    const rolesCount = await Role.estimatedDocumentCount()
    if (rolesCount === 0) {
      await Promise.all([
        new Role({ name: 'admin' }).save(),
        new Role({ name: 'standard' }).save()
      ])
    }

    // Create predefined users
    const usersCount = await User.estimatedDocumentCount()
    if (usersCount === 0) {
      const newUser = new User({
        username: 'CrisNar',
        email: 'crisnar@hotmail.com',
        password: await User.encryptPassword('Password12]')
      })
      const role = await Role.findOne({ name: 'admin' })
      newUser.roles = [role._id]

      await newUser.save()

      const newUser2 = new User({
        username: 'DavLop',
        email: 'davlop@hotmail.com',
        password: await User.encryptPassword('Password13]')
      })
      const role2 = await Role.findOne({ name: 'admin' })
      newUser2.roles = [role2._id]

      await newUser2.save()
    }
    // Create predefined products
    const productsCount = await Product.estimatedDocumentCount()
    if (productsCount === 0) {
      const newProduct = new Product({
        name: 'Cheese Cake',
        description: 'Delicious chese cake wiht strawberries',
        price: 10000,
        likes: 1,
        isPrivate: false
      })

      const user = await User.findOne({ username: 'DavLop' })
      newProduct.createdBy = [user._id]

      await newProduct.save()

      const newProduct2 = new Product({
        name: 'Chocolate Cake',
        description: 'Delicious chocolate cake wiht strawberries',
        price: 20000,
        likes: 2,
        isPrivate: false
      })

      const user2 = await User.findOne({ username: 'CrisNar' })
      newProduct2.createdBy = [user2._id]

      await newProduct2.save()
    }
  } catch (error) {
    console.error(error)
  }
}
