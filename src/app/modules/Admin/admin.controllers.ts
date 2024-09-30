import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.serrvice";

const blockUser = catchAsync(async (req, res) => {
    const {id} = req.params; 
    const result = await AdminServices.blockUser(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Blocked Successfully',
        data: result,
      })
})

const unBlockUser = catchAsync(async (req, res) => {
    const {id} = req.params; 
    const result = await AdminServices.unBlockUser(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User UnBlocked Successfully',
        data: result,
      })
})


const publishRecipe = catchAsync(async (req, res) => {
    const {id} = req.params; 
    const result = await AdminServices.publishRecipe(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Recipe Published Successfully',
        data: result,
      })
})

const unPublishRecipe = catchAsync(async (req, res) => {
    const {id} = req.params; 
    const result = await AdminServices.unPublishRecipe(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Recipe unPublished Successfully',
        data: result,
      })
})

const deleteRecipe = catchAsync(async (req, res) => {
    const {id} = req.params; 
    const result = await AdminServices.deleteRecipesFromDb(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Recipe deleted Successfully',
        data: result,
      })
})



export const AdminControllers = {
    blockUser,
    unBlockUser,
    publishRecipe,
    unPublishRecipe,
    deleteRecipe
}