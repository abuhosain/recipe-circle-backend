import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { RecipeServices } from "./recipes.service";

const createRecipe = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await RecipeServices.createRecipesIntoDb(payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Recipe Created Successfully',
        data: result,
      })
})


const deleteRecipe = catchAsync(async (req, res) => {
   const {id} = req.params;
    const result = await RecipeServices.deleteRecipesFromDb(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Recipe Deleted Successfully',
        data: result,
      })
})

export const RecipeControllers = {
    createRecipe,
    deleteRecipe
}