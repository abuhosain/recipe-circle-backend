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

export const SocialRoutes = router
