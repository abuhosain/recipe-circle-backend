import mongoose, { Schema, model } from 'mongoose';
import { IRating } from '../Recipes/recipes.interface';

// Rating Schema
const ratingSchema = new Schema<IRating>(
  {
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

// Export Rating Model
export const Rating = model<IRating>('Rating', ratingSchema);
