import express, { NextFunction, Request, Response } from 'express'
import { AuthControllers } from './auth.controller'
import auth from '../../middleware/auth'
import { USER_ROLE } from './auth.constance'
import { multerUpload } from '../../config/multer.config'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './auth.validation'

const router = express.Router()

// signup user
router.post(
  '/signup',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded')
    }
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(AuthValidation.userValidationSchema),
  AuthControllers.singupUser,
)

// singin in login
router.post(
  '/login',
  AuthControllers.loginUser,
  validateRequest(AuthValidation.loginValidationSchema),
)

// chnage password
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
)

// refrsh token
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
)

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
)

router.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
)

export const AuthRoutes = router
