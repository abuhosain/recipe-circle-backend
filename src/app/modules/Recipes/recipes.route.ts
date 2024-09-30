import express from 'express'
import { RecipeControllers } from './recipes.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../Auth/auth.constance'

const router = express.Router()

router.post('/', RecipeControllers.createRecipe)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  RecipeControllers.deleteRecipe,
)

export const RecipeRoutes = router
