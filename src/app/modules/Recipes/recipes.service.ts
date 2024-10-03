import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { User } from '../Auth/auth.model'
import { IRecipe } from './recipes.interface'
import { Recipe } from './recipes.model'
import { JwtPayload } from 'jsonwebtoken'
import QueryBuilder from '../../builder/QueryBuilder'

const createRecipesIntoDb = async (payload: IRecipe) => {
  const { author } = payload
  const user = await User.findById(author)
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found')
  }
  const result = await Recipe.create(payload)
  return result
}

const getAllRecipes = async (
  user: JwtPayload,
  query: Record<string, unknown>,
) => {
  let baseQuery = Recipe.find({ isDeleted: false, isPublished: true })

  // Apply restrictions for non-premium users
  if (!user?.isPremium && user?.role !== 'admin') {
    baseQuery = baseQuery.find({ isPremium: false })
  }

  // Initialize the QueryBuilder with the base query and the user's query parameters
  const queryBuilder = new QueryBuilder(baseQuery, query)

  // Use QueryBuilder for advanced search, filtering, sorting, and pagination
  const resultQuery = queryBuilder
    .search(['title', 'tags', 'ingredients.name']) // Searchable fields: title, tags, ingredients
    .filter() // Apply filters from query
    .sort() // Apply sorting if any
    .paginate() // Apply pagination
    .fields().modelQuery // Select specific fields if required // Get the built query

  // Execute the final query
  const recipes = await resultQuery.populate('ratings').populate('comments')
  const totalData = await queryBuilder.countTotal() // Optional: Get total counts for pagination

  return { recipes, totalData }
}

const getRecipeById = async (user: JwtPayload, id: string) => {
  // Fetch the recipe by its ID and populate ratings and comments
  const recipe = await Recipe.findById(id)
    .populate('ratings')
    .populate('comments');

  // Check if the recipe exists
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found');
  }

  // Apply restrictions for non-premium users and non-admins
  if (recipe.isPremium && (!user?.isPremium && user?.role !== 'admin')) {
    throw new AppError(httpStatus.FORBIDDEN, 'This recipe is only available for premium users');
  }

  // Check if the recipe is deleted
  if (recipe.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This recipe has been deleted');
  }

  // Check if the recipe is published
  if (!recipe.isPublished) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This recipe is not published');
  }

  // Return the recipe
  return recipe;
};

const updateRecipeById = async (id: string, payload: Partial<IRecipe>) => {
  const recipe = await Recipe.findById(id)
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe is not found')
  }

  const result = await Recipe.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteRecipesFromDb = async (id: string) => {
  const result = await Recipe.findByIdAndDelete(id)
  return result
}

export const RecipeServices = {
  createRecipesIntoDb,
  deleteRecipesFromDb,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
}
