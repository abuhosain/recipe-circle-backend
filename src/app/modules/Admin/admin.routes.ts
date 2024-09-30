import express from 'express'

import auth from '../../middleware/auth'
import { USER_ROLE } from '../Auth/auth.constance'
import { AdminControllers } from './admin.controllers'

const router = express.Router()

// block user
router.post('/block/:id', auth(USER_ROLE.admin), AdminControllers.blockUser);
// unblock user
router.post('/ublock/:id', auth(USER_ROLE.admin), AdminControllers.unBlockUser);

// publish recipe
router.post('/block/:id', auth(USER_ROLE.admin), AdminControllers.publishRecipe);
// unpublish user
router.post('/ublock/:id', auth(USER_ROLE.admin), AdminControllers.unPublishRecipe);



export const AdminRoutes = router
