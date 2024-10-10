import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controllers'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../Auth/auth.constance'
import { multerUpload } from '../../config/multer.config'

const router = express.Router()

// get user
router.get('/:id', UserController.getUser)

// get user with auth
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getUserWithAuth,
)
// update user;
router.put(
  '/update',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserController.updateUser,
)

// delete user;
router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserController.deleteUser,
)

// Follow a user
router.post(
  '/follow/:userId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserController.followUser,
)

// unFollow a user
router.post(
  '/unfollow/:userId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserController.unFollowUser,
)

// get recipes by user
router.get('/recipe/:userId', UserController.getAllRecipesbyUserId)

export const UserRoutes = router
