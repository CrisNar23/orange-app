import Product from '../models/Product.js'

// Function to create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, isPrivate } = req.body
  try {
    if (!name || !description || !price || isPrivate === undefined) {
      return res.status(400).json({ message: 'Invalid Request' })
    }

    const foundProduct = await Product.findOne({ name })

    if (foundProduct) {
      return res.status(400).json({
        message:
          'Product name already exist. Choose another name and try again.'
      })
    }

    const newProduct = new Product({
      name,
      description,
      price,
      likes: 0,
      createdBy: req.userId,
      isPrivate
    })
    const productSaved = await newProduct.save()
    res
      .status(201)
      .json({ message: 'Product created succefully', product: productSaved })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Function to read only public products
export const readPublicProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  try {
    const products = await Product.find({ isPrivate: { $eq: false } })
      .populate({
        path: 'createdBy',
        select: 'username'
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Product.estimatedDocumentCount()

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// FunCtion to read elements created by themselves
export const readOwnProducts = async (req, res) => {
  const { userId } = req.params
  const userReq = req.userId
  const { page = 1, limit = 10 } = req.query

  try {
    if (userId !== userReq) {
      return res.status(403).json({
        message: 'Private information. Unauthorized to show this data'
      })
    }
    const products = await Product.find({
      createdBy: { $eq: userId }
    })
      .populate({
        path: 'createdBy',
        select: 'username'
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Product.estimatedDocumentCount()

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Function to edit private products
export const editPrivateProducts = async (req, res) => {
  const { productId, userId } = req.params
  const userReq = req.userId
  try {
    if (userId !== userReq) {
      return res.status(403).json({
        message: 'Private information. Unauthorized to show this data'
      })
    }

    const products = await Product.findByIdAndUpdate(productId, req.body, {
      new: true
    }).populate({
      path: 'createdBy',
      select: 'username'
    })
    res.status(200).json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Function to delete a private product by id
export const deletePrivateProductsById = async (req, res) => {
  const { productId, userId } = req.params
  const userReq = req.userId
  try {
    if (userId !== userReq) {
      return res.status(403).json({
        message: 'Private information. Unauthorized to show this data'
      })
    }

    await Product.findByIdAndDelete(productId)
    res.status(200).json({ message: 'Product deleted successfuly' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Function to delete all private products
export const deleteAllPrivateProducts = async (req, res) => {
  const { userId } = req.params
  const userReq = req.userId

  try {
    if (userId !== userReq) {
      return res.status(403).json({
        message: 'Private information. Unauthorized to show this data'
      })
    }
    await Product.deleteMany()
    res
      .status(200)
      .json({ message: 'All products have been deleted successfuly' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Function to like a product by id
export const likeToPublicProducts = async (req, res) => {
  const { productId } = req.params

  try {
    const foundProduct = await Product.findOne({ _id: productId })
    if (!foundProduct) {
      return res.status(404).json({
        message: 'Product not found. Verify id and try again'
      })
    }

    if (foundProduct.isPrivate === true) {
      return res.status(403).json({
        message: 'Private information. Unauthorized to show this data'
      })
    }
    const product = await Product.findByIdAndUpdate(
      productId,
      { likes: foundProduct.likes + 1 },
      {
        new: true
      }
    ).populate({
      path: 'createdBy',
      select: 'username'
    })
    res.status(200).json(product)
  } catch (error) {}
}

// Function to get a list of public products with likes
export const listOfLikes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  try {
    const products = await Product.find({ likes: { $gt: 0 } })
      .populate({
        path: 'createdBy',
        select: 'username'
      })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Product.estimatedDocumentCount()

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
