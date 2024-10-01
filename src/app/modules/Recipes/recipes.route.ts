import express from 'express'
import { RecipeControllers } from './recipes.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../Auth/auth.constance'
import OptionalAuth from '../../middleware/optionalAuth'

const router = express.Router()

// create recipe
router.post('/', RecipeControllers.createRecipe);

// getSingle recipe
router.get("/:recipeId", auth(USER_ROLE.admin, USER_ROLE.user), RecipeControllers.getRecipeById)

// get all recipe
router.get("/",OptionalAuth(USER_ROLE.admin, USER_ROLE.user), RecipeControllers.getAllRecipes);

// delete recipe
router.delete(
  '/:id',
  auth( USER_ROLE.user),
  RecipeControllers.deleteRecipe,
)

export const RecipeRoutes = router
