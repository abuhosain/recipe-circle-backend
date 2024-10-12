import { JwtPayload } from 'jsonwebtoken'
import { User } from '../Auth/auth.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { IUser } from '../Auth/auth.interface'
import { Types } from 'mongoose'
import { Recipe } from '../Recipes/recipes.model'
import { TImageFile } from '../../interface/image.interface'

const getUserFromDb = async (id: string) => {
  const user = await User.findOne({
    _id: id,
    isBlocked: false,
    isDeleted: false,
  })
    .populate({
      path: 'followers',
    })
    .populate({
      path: 'following',
    })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  return user
}

const getUserWithAuth = async (email: string) => {
  const user = await User.findOne({ email: email })
    .populate({
      path: 'followers',
    })
    .populate({
      path: 'following',
    })
  return user
}

const updateUserIntoDb = async (
  email: string,
  payload: Partial<IUser>,
  file: TImageFile,
) => {
  const user = await User.findOne({
    email: email,
    isDeleted: false,
    isBlocked: false,
  })
  // if user not found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
  }
  const { email: newEmail } = payload
  const emailCheck = await User.isUserExistsByEmail(newEmail as string)

  if (emailCheck) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This email is already taken')
  }

  if (file?.path) {
    payload.profilePicture = file.path
  }
  

  const updatedUser = await User.findOneAndUpdate({ email: email }, payload, {
    new: true,
  })

  return updatedUser
}

const deleteUserAccountFromDb = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

const followUser = async (
  followerId: Types.ObjectId,
  followeeId: Types.ObjectId,
) => {
  // Prevent a user from following themselves
  if (followerId.equals(followeeId)) {
    throw new Error('You cannot follow yourself')
  }

  // Find both users (follower and followee)
  const follower : any = await User.findById(followerId)
  const followee = await User.findById(followeeId)

  if (!followee) {
    throw new Error('User not found')
  }

  // Prevent following if the user is deleted or blocked
  if (followee.isDeleted || followee.isBlocked) {
    throw new Error('Cannot follow this user')
  }

  // Default to an empty array if follower.following or followee.followers is undefined
  const followingList = follower?.following ?? []
  const followersList = followee?.followers ?? []

  // Check if the user is already following
  if (followingList.includes(followeeId)) {
    throw new Error('Already following')
  }

  // Add followee to the following list
  followingList.push(followeeId)

  // Add follower to the followers list
  followersList.push(followerId)

  // Save both users
  follower.following = followingList // Ensure to assign the updated following list
  await follower.save()
  await User.findByIdAndUpdate(followeeId, { followers: followersList })

  return followersList.length // Return the number of followers
}

const unfollowUser = async (
  followerId: Types.ObjectId,
  followeeId: Types.ObjectId,
) => {
  // Prevent a user from unfollowing themselves
  if (followerId.equals(followeeId)) {
    throw new Error('You cannot unfollow yourself')
  }

  // Find both users (follower and followee)
  const follower : any = await User.findById(followerId)
  const followee = await User.findById(followeeId)

  if (!followee) {
    throw new Error('User not found')
  }

  // Default to an empty array if follower.following or followee.followers is undefined
  const followingList = follower?.following ?? []
  const followersList = followee?.followers ?? []

  // Check if the user is not following the followee
  if (!followingList.includes(followeeId)) {
    throw new Error('You are not following this user')
  }

  // Remove the followee from the follower's following list
  follower.following = followingList.filter(
    (followingId : any) => !followingId.equals(followeeId),
  )

  // Remove the follower from the followee's followers list
  const updatedFollowersList = followersList.filter(
    (followerIdInList) => !followerIdInList.equals(followerId),
  )

  // Save both users
  await follower.save()
  await User.findByIdAndUpdate(followeeId, { followers: updatedFollowersList })

  return updatedFollowersList.length // Return the updated number of followers
}

const getAllRecipesByUserId = async (userId: string) => {
  // Query to fetch recipes based on the user's premium status
  const recipes = await Recipe.find({
    author: userId,
    isDeleted: false,
    isPublished: true,
  })
    .populate('ratings')
    .populate({
      path: 'comments',
      populate: {
        path: 'user', // Populating the user field in comments
      },
    })
    .populate('author')

  return recipes // Return the fetched recipes
}

export const UserServices = {
  getUserFromDb,
  updateUserIntoDb,
  deleteUserAccountFromDb,
  followUser,
  unfollowUser,
  getAllRecipesByUserId,
  getUserWithAuth,
}
