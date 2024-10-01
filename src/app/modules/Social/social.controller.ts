import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { SocialServices } from "./social.service";
import { Types } from "mongoose";

 
// Add rating to a recipe
const addRating = catchAsync(async (req, res) => {
  const userId = req?.user?.id;  
  const { rating } = req.body;  
  const {recipeId}  = req.params;

  const result = await SocialServices.addRating(userId, recipeId, rating); // Call service to add rating

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rating added successfully',
    data: result, // Send back the updated recipe with virtual fields
  });
});

export const SocialController = {
  addRating,
};
