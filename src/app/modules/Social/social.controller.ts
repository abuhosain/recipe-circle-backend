import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { SocialServices } from "./social.service";


 
// Add rating to a recipe
const addRating = catchAsync(async (req, res) => {
  const {id} = req.user;
  const { rating } = req.body;  
  const {recipeId}  = req.params;

  const result = await SocialServices.addRating(id , recipeId, rating); // Call service to add rating

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rating added successfully',
    data: result, // Send back the updated recipe with virtual fields
  });
});

// Add comment to a recipe
const addComment = catchAsync(async (req, res) => {
  const { id } = req.user; // Get the user ID from the authenticated request
  const { content } = req.body; // Get the comment text from the request body
  const { recipeId } = req.params; // Get the recipe ID from the URL params

  const result = await SocialServices.addComment(id, recipeId, content); // Call service to add comment

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment added successfully',
    data: result, // Send back the updated recipe with comments
  });
});


export const SocialController = {
  addRating,
  addComment
};
