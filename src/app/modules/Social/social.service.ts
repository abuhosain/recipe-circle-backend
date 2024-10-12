import AppError from '../../errors/AppError'
import { Comment } from '../Comment/comment.model';
import { Rating } from '../Rating/rating.model';
import { Recipe } from '../Recipes/recipes.model'
import httpStatus from 'http-status'

// Add or update rating
export const addRating = async (
  userId: string,
  recipeId: string,
  ratingValue: number,
) => {
  // Check if the recipe exists
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  // Check if the user has already rated this recipe
  const existingRating = await Rating.findOne({ recipe: recipeId, user: userId });

  if (existingRating) {
    // If a rating already exists, update it
    existingRating.rating = ratingValue;
    await existingRating.save();
  } else {
    // If no existing rating, create a new one
    const newRating : any = new Rating({
      user: userId,
      recipe: recipeId,
      rating: ratingValue,
    });
    await newRating.save();

    // Push the rating reference to the recipe's `ratings` array
    recipe?.ratings?.push(newRating._id);
    await recipe.save();
  }

  // Recalculate and return the updated recipe with average rating and other virtual fields
  const updatedRecipe = await Recipe.findById(recipeId)
    .populate('ratings') // Populate to calculate averageRating
    .lean()
    .exec();

  return updatedRecipe;
};
export const addComment = async (
  userId: string,
  recipeId: string,
  content: string
) => {
  // Find the recipe by ID
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  // Create a new comment
  const newComment : any = await Comment.create({
    recipe: recipeId,
    user: userId,
    content: content,
  });

  // Add the new comment's ID to the recipe's comments array
  recipe?.comments?.push(newComment._id);

  // Save the updated recipe with the new comment reference
  await recipe.save();

  // Optionally, return the updated recipe with populated comments
  return Recipe.findById(recipeId).populate('comments').lean().exec(); // Populates comments and returns plain JS object
};


export const updateComment = async (
  userId: string,
  recipeId: string,
  commentId: string, // This is the _id of the comment
  content: string
) => {
  // Find the recipe by ID
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  // Find the comment by _id and userId
  const existingComment = await Comment.findOne({
    _id: commentId,
    user: userId,
    recipe: recipeId, // Ensure the comment belongs to the recipe
  });

  if (!existingComment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  // Update the content of the comment
  existingComment.content = content;

  // Save the updated comment
  await existingComment.save();

  // Optionally, return the updated recipe with populated comments
  return Recipe.findById(recipeId).populate('comments').lean().exec(); // Populates comments
};



export const deleteComment = async (
  userId: string,
  recipeId: string,
  commentId: string // This is the _id of the comment
) => {
  // Find the recipe by ID
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  // Find and validate the comment
  const existingComment = await Comment.findOne({
    _id: commentId,
    user: userId,
    recipe: recipeId, // Ensure the comment belongs to the recipe
  });

  if (!existingComment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  // Remove the comment from the Comment model
  await Comment.deleteOne({ _id: commentId });

  // Remove the reference from the recipe
  recipe.comments = recipe?.comments?.filter(
    (comment: any) => comment.toString() !== commentId
  );

  // Save the updated recipe
  await recipe.save();

  // Return the updated recipe with populated comments if needed
  return Recipe.findById(recipeId).populate('comments').lean().exec();
};



// Upvote or downvote a recipe
 const voteRecipe = async (
  userId: string ,
  recipeId: string,
  voteValue: 1 | -1, // 1 for upvote, -1 for downvote
) => {
  const recipe : any = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  const existingVote = recipe?.votes?.find((v: any) => v.user.toString() === userId);

  if (existingVote) {
    // If the user has already voted
    if (existingVote.vote === voteValue) {
      // If the user votes the same, remove the vote (toggle)
      recipe.votes = recipe?.votes?.filter((v: any) => v.user.toString() !== userId);
    } else {
      // If the user changes their vote (upvote to downvote or vice versa)
      existingVote.vote = voteValue;
    }
  } else {
    // If the user hasn't voted yet
    recipe?.votes?.push({ user: userId, vote: voteValue });
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
