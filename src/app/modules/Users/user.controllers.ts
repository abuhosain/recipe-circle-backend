import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './users.services'
import { User } from '../Auth/auth.model'
import AppError from '../../errors/AppError'
import { Types } from 'mongoose'

const getUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserServices.getUserFromDb(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get user successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const user: any = req.user
  const payload = req.body
  const result = await UserServices.updateUserIntoDb(user?.email, payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserServices.deleteUserAccountFromDb(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  })
})

const followUser = catchAsync(async (req, res) => {
    // Get email or username from JWT payload (req.user)
    const userIdentifier = req?.user?.email || req?.user?.username;
  console.log(userIdentifier);
    // Find the follower user using email or username
    const follower = await User.findOne({
      $or: [{ email: userIdentifier }, { username: userIdentifier }],
    });
  
    // User not found
    if (!follower) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
  
    const followerId = follower._id; // Follower's ID
    const followeeId : any = req.params.userId; // Followee's ID from the route
    console.log(followeeId)
  
    // Call the service to follow the user
    const result = await UserServices.followUser(followerId, followeeId);
  
    // Send the response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully followed the user',
      data: result,
    });
  });

const unFollowUser = catchAsync(async (req, res) => {
    // Get email or username from JWT payload (req.user)
    const userIdentifier = req?.user?.email || req?.user?.username;
  console.log(userIdentifier);
    // Find the follower user using email or username
    const follower = await User.findOne({
      $or: [{ email: userIdentifier }, { username: userIdentifier }],
    });
  
    // User not found
    if (!follower) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
  
    const followerId = follower._id; // Follower's ID
    const followeeId : any = req.params.userId; // Followee's ID from the route
    console.log(followeeId)
  
    // Call the service to follow the user
    const result = await UserServices.unfollowUser(followerId, followeeId);
  
    // Send the response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully unFollowed the user',
      data: result,
    });
  });
  

export const UserController = {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unFollowUser
}
