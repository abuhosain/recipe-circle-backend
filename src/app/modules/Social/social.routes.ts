import express from 'express'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../Auth/auth.constance'
import { SocialController } from './social.controller'

const router = express.Router()

// add rating
router.post(
  '/rating/:recipeId',
  auth(USER_ROLE.user),
  SocialController.addRating,
)
// add comment
router.post(
  '/comment/recipes/:recipeId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  SocialController.addComment,
)

// Update a comment by _id
router.put('/recipes/:recipeId/comment/:commentId', auth(USER_ROLE.user), SocialController.updateComment);

// Delete a comment by _id
router.delete('/recipes/:recipeId/comment/:commentId', auth(USER_ROLE.user), SocialController.deleteComment);

// Upvote or downvote a recipe
router.post('/recipes/:recipeId/vote', auth(USER_ROLE.user), SocialController.vote);



export const SocialRoutes = router
