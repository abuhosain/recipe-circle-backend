import AppError from '../../errors/AppError'
import { Recipe } from '../Recipes/recipes.model'
import httpStatus from 'http-status'

export const addRating = async (
  userId: string,
  recipeId: string,
  rating: number,
) => {
  // Find the recipe by ID
  const recipe = await Recipe.findById(recipeId)
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found')
  }

  // Check if the user has already rated the recipe
  const existingRating = recipe.ratings.find(
    (r: any) => r.user.toString() === userId,
  )

  if (existingRating) {
    // If the user has already rated the recipe, update the existing rating
    existingRating.rating = rating
  } else {
    // If the user hasn't rated the recipe, add a new rating
    recipe.ratings.push({ user: userId, rating })
  }

  // Save the updated recipe
  await recipe.save()

  // Optionally, return the updated recipe including the virtual fields (like averageRating)
  return Recipe.findById(recipeId).lean().exec() // Lean gives a plain JavaScript object instead of Mongoose document
}

export const addComment = async (
  userId: string,
  recipeId: string,
  content: string,
) => {
  // Find the recipe by ID
  const recipe = await Recipe.findById(recipeId)
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found')
  }

  // Add the new comment to the recipe's contents array
  recipe.comments.push({ user: userId, content })

  // Save the updated recipe
  await recipe.save()

  // Optionally, return the updated recipe with comments
  return Recipe.findById(recipeId).lean().exec() // Lean gives a plain JavaScript object instead of Mongoose document
}



export const SocialServices = {
  addRating,
  addComment
}
