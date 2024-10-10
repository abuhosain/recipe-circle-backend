import express from 'express'
import { RecipeControllers } from './recipes.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../Auth/auth.constance'
import OptionalAuth from '../../middleware/optionalAuth'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middleware/bodyParser'

const router = express.Router()

// create recipe
router.post('/',auth(USER_ROLE.user, USER_ROLE.admin), multerUpload.fields([{ name: 'file' }]),  parseBody,  RecipeControllers.createRecipe);

// getSingle recipe
router.get("/:recipeId",  RecipeControllers.getRecipeById);

// update recipe
router.put("/:recipeId", auth( USER_ROLE.user), RecipeControllers.getRecipeById)

// get all recipe
router.get("/",OptionalAuth(USER_ROLE.admin, USER_ROLE.user), RecipeControllers.getAllRecipes);

// delete recipe
router.delete(
  '/:recipeId',
  auth( USER_ROLE.user, USER_ROLE.admin),
  RecipeControllers.deleteRecipe,
)

export const RecipeRoutes = router
