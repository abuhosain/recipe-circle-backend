import express from 'express'

import auth from '../../middleware/auth'
import { USER_ROLE } from '../Auth/auth.constance'
import { AdminControllers } from './admin.controllers'

const router = express.Router()



// get all user
router.get('/user', auth(USER_ROLE.admin), AdminControllers.getAllUser);


router.get("/recipe", auth(USER_ROLE.admin), AdminControllers.getAllRecipe )

// block user
router.put('/block/:id', auth(USER_ROLE.admin), AdminControllers.blockUser);
// unblock user
router.put('/unblock/:id', auth(USER_ROLE.admin), AdminControllers.unBlockUser);

// publish recipe
router.put('/publish/:id', auth(USER_ROLE.admin), AdminControllers.publishRecipe);

// unpublish recipe
router.put('/unpublish/:id', auth(USER_ROLE.admin), AdminControllers.unPublishRecipe);

// delete recipe
router.delete('recipe/:id', auth(USER_ROLE.admin), AdminControllers.deleteRecipe);

// delete user
router.delete('/user/:id', auth(USER_ROLE.admin), AdminControllers.deleteUser);



export const AdminRoutes = router
