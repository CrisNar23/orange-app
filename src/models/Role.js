import mongoose from 'mongoose'
const { Schema, model } = mongoose

// Model to represent a role into the database
const roleSchema = Schema(
  {
    name: String
  },
  {
    versionKey: false
  }
)

export default model('Role', roleSchema)
