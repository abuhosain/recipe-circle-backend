import express from 'express'
import { AuthControllers } from './auth.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from './auth.constance'

const router = express.Router()

// signup user
router.post('/signup', AuthControllers.singupUser)

// singin in login
router.post('/login', AuthControllers.loginUser)

// chnage password
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  AuthControllers.changePassword,
)

// refrsh token
router.post('/refresh-token', AuthControllers.refreshToken);

router.post(
  '/forget-password',
  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',
  AuthControllers.resetPassword,
);


export const AuthRoutes = router
