import mongoose, { model, Schema } from 'mongoose'
import { IRecipe } from './recipes.interface'
import { ingredientSchema } from '../Ingredient/ingredient.model'

export const recipisSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    ingredients: [ingredientSchema],
    instructions: { type: String, required: true },
    images: [{ type: String }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPremium: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }],
    tags: {
      type: [{ type: String }],
    },
  },
  { timestamps: true },
)

// Virtual field for average rating
recipisSchema.virtual('averageRating').get(function () {
  if (this?.ratings?.length === 0) {
    return 0
  } else {
    const sum = this?.ratings?.reduce((acc, curr) => acc + curr.rating, 0)
    return sum / this?.ratings?.length
  }
})

// Virtual field for vote score
recipisSchema.virtual('voteScore').get(function () {
  if (this?.votes?.length === 0) return 0
  const sum = this?.votes?.reduce((acc, curr) => acc + curr.vote, 0)
  return sum
})

// Ensure virtual fields are serialized
recipisSchema.set('toJSON', { virtuals: true })
recipisSchema.set('toObject', { virtuals: true })

export const Recipe = model<IRecipe>('Recipe', recipisSchema)
