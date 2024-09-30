import mongoose, { model, Schema } from 'mongoose'
import { IRating } from './rating.interface'

const ratingSchema = new Schema<IRating>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true },
)

export const Rating = model<IRating>('Rating', ratingSchema)
