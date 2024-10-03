import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import { RecipeServices } from './recipes.service'
import { User } from '../Auth/auth.model'

const createRecipe = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await RecipeServices.createRecipesIntoDb(payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe Created Successfully',
    data: result,
  })
})




const getRecipeById = catchAsync(async (req, res) => {
  const {recipeId} = req.params;
  const user : any = req.user;
  const result = await RecipeServices.getRecipeById(user, recipeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Recipe retrive Successfully',
    data: result,
  })
})


const getAllRecipes = catchAsync(async (req, res) => {
  const email = req.user?.email;
  const query = req.query;
  const user: any = await User.findOne({ email: email })
  const result = await RecipeServices.getAllRecipes(user, query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe retrive Successfully',
    data: result,
  })
})

const updateRecipeById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body
    const result = await RecipeServices.updateRecipeById(
      id,
      payload,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Facility updated successfully',
      data: result,
    })
  })

const deleteRecipe = catchAsync(async (req, res) => {
  const { recipeId } = req.params
  const result = await RecipeServices.deleteRecipesFromDb(recipeId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe Deleted Successfully',
    data: result,
  })
})

export const RecipeControllers = {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById
}
