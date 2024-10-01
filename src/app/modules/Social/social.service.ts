import AppError from '../../errors/AppError';
import { Recipe } from '../Recipes/recipes.model';
 
import httpStatus from 'http-status';

// Add rating to a recipe
export const addRating = async (userId: string, recipeId: string, rating: number) => {
  // Find the recipe by ID
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  // Check if the user has already rated the recipe
  const existingRating = recipe.ratings.find((r : any) => r.user.toString() === userId);
  if (existingRating) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User has already rated this recipe');
  }

  // Add the new rating to the recipe's ratings array
  recipe.ratings.push({ user: userId, rating });

  // Save the updated recipe
  await recipe.save();

  // Optionally, return the updated recipe including the virtual fields (like averageRating)
  return Recipe.findById(recipeId).lean().exec(); // Lean gives a plain JavaScript object instead of Mongoose document
};

export const SocialServices = {
  addRating,
};
