import mongoose, { Schema, model } from 'mongoose';
import { IRecipe } from './recipe.interface';

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['Spices', 'Vegetables', 'Meat', 'Dairy', 'Other'],
    required: true,
  },
});

// Rating, comment, and vote schemas
const ratingSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const commentSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
});

const voteSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vote: { type: Number, enum: [1, -1], required: true },
});

// Main Recipe Schema
const recipeSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    ingredients: [ingredientSchema],
    instructions: { type: String, required: true },
    images: [{ type: String }], // URLs to images
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPremium: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    tags: [{ type: String }],
    cookingTime: { type: Number, required: true }, // in minutes

    // Default to empty arrays
    ratings: { type: [ratingSchema], default: [] },
    comments: { type: [commentSchema], default: [] },
    votes: { type: [voteSchema], default: [] },
  },
  { timestamps: true }
);

// Virtual field for average rating
recipeSchema.virtual('averageRating').get(function () {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc: number, rating: { rating: number }) => acc + rating.rating, 0);
  return sum / this.ratings.length;
});

// Virtual field for vote score
recipeSchema.virtual('voteScore').get(function () {
  if (this.votes.length === 0) return 0;
  const sum = this.votes.reduce((acc: number, vote: { vote: number }) => acc + vote.vote, 0);
  return sum;
});

// Virtual field for counting ratings
recipeSchema.virtual('ratingCounts').get(function () {
  return this.ratings.length;
});

// Ensure virtual fields are serialized
recipeSchema.set('toJSON', { virtuals: true });
recipeSchema.set('toObject', { virtuals: true });

// Export Recipe Model
export const Recipe = model<IRecipe>('Recipe', recipeSchema);
