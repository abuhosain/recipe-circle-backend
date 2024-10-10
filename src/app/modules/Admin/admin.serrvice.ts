import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { User } from '../Auth/auth.model'
import { Recipe } from '../Recipes/recipes.model'

const getAllUsrFromDb = async () => {
  const result = await User.find({ isDeleted : false});
  return result
}
const getAllRecipeFromDb = async () => {
  const result = await Recipe.find({ isDeleted : false});
  return result
}

const blockUser = async (id: string) => {
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  )
  return result
}

const unBlockUsers = async (id: string) => {
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: false },
    { new: true },
  )
  return result
}

const deleteRecipesFromDb = async (id : string) => {
  const result = await Recipe.findByIdAndUpdate(id, {isDeleted : true}, {new : true});
  return result;
}


const deleteUserFromDb = async (id : string) => {
  const result = await User.findByIdAndUpdate(id, {isDeleted : true}, {new : true});
  return result;
}


const publishRecipe = async (id: string) => {
  const recipe = await Recipe.findById(id)
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found')
  }
  const result = await Recipe.findByIdAndUpdate(
    id,
    { isPublished: true },
    { new: true },
  )
  return result
}

const unPublishRecipe = async (id: string) => {
  const recipe = await Recipe.findById(id)
  if (!recipe) {
    throw new AppError(httpStatus.NOT_FOUND, 'Recipe not found')
  }
  const result = await Recipe.findByIdAndUpdate(
    id,
    { isPublished: false },
    { new: true },
  )
  return result
}

export const AdminServices = {
  blockUser,
  unBlockUsers,
  publishRecipe,
  unPublishRecipe,
  deleteRecipesFromDb,
  getAllUsrFromDb,
  deleteUserFromDb,
  getAllRecipeFromDb
}
