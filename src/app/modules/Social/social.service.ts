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

export const updateComment = async (
  userId: string,
  recipeId: string,
  commentId: string, // This is the _id of the comment
  content: string,
) => {
  // Find the recipe by ID
  const recipe = await Recipe.findById(recipeId)
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found')
  }

  // Find the comment by _id and userId
  const existingComment = recipe.comments.find(
    (c: any) => c._id.toString() === commentId && c.user.toString() === userId,
  )
  if (!existingComment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found')
  }

  // Update the content of the comment
  existingComment.content = content

  // Save the updated recipe
  await recipe.save()

  // Return the updated recipe
  return Recipe.findById(recipeId).lean().exec()
}


export const deleteComment = async (
  userId: string,
  recipeId: string,
  commentId: string, // This is the _id of the comment
) => {
  // Find the recipe by ID
  const recipe = await Recipe.findById(recipeId)
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found')
  }

  // Find and remove the comment by _id and userId
  const commentIndex = recipe.comments.findIndex(
    (c: any) => c._id.toString() === commentId && c.user.toString() === userId,
  )
  if (commentIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found')
  }

  // Remove the comment
  recipe.comments.splice(commentIndex, 1)

  // Save the updated recipe
  await recipe.save()

  // Return the updated recipe
  return Recipe.findById(recipeId).lean().exec()
}




// Upvote or downvote a recipe
 const voteRecipe = async (
  userId: string,
  recipeId: string,
  voteValue: 1 | -1, // 1 for upvote, -1 for downvote
) => {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  const existingVote = recipe.votes.find((v: any) => v.user.toString() === userId);

  if (existingVote) {
    // If the user has already voted
    if (existingVote.vote === voteValue) {
      // If the user votes the same, remove the vote (toggle)
      recipe.votes = recipe.votes.filter((v: any) => v.user.toString() !== userId);
    } else {
      // If the user changes their vote (upvote to downvote or vice versa)
      existingVote.vote = voteValue;
    }
  } else {
    // If the user hasn't voted yet
    recipe.votes.push({ user: userId, vote: voteValue });
  }

  await recipe.save();
  return recipe;
};


export const SocialServices = {
  addRating,
  addComment,
  updateComment,
  deleteComment,
  voteRecipe,
}
