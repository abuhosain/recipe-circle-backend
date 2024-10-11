import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'
import config from '../../config'
import AppError from '../../errors/AppError'
import { JwtPayload } from 'jsonwebtoken'

const singupUser = catchAsync(async (req, res) => {
  const user = req.body;
  const file : any = req.file;

  const result = await AuthServices.signUpUserIntoDb(user, file )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)

  const { accessToken, needsPasswordChange, refreshToken } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged succesfully',
    data: {needsPasswordChange, accessToken, refreshToken},
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  })
})

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body
  const user = req?.user
  const result = await AuthServices.changePassword(user as JwtPayload, passwordData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated succesfully!',
    data: result,
  })
})

const forgetPassword = catchAsync(async (req, res) => {
  const userEmail = req.body.email
  const result = await AuthServices.forgetPassword(userEmail)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  })
})

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !')
  }

  const result = await AuthServices.resetPassword(req.body, token)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset succesfully!',
    data: result,
  })
})

export const AuthControllers = {
  singupUser,
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
}
