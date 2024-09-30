import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { User } from '../Auth/auth.model'
import { Recipe } from '../Recipes/recipes.model'

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

const unBlockUser = async (id: string) => {
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
  unBlockUser,
  publishRecipe,
  unPublishRecipe
}
