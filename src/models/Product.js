import mongoose from 'mongoose'
const { Schema, model } = mongoose

// Model to represent an product into the database
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    likes: {
      type: Number,
      required: true
    },
    isPrivate: {
      type: Boolean,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Product', productSchema)
