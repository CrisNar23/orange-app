import mongoose from 'mongoose'

// Database connection and configuration
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('DB Online')
  } catch (error) {
    console.log(error)
    throw new Error('Error connecting BD')
  }
}

export default dbConnection
