import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

const singupUser = catchAsync(async (req, res) => {
  const user = req.body
  const result = await AuthServices.signUpUserIntoDb(user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)

  const { accessToken, user } = result
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    token: accessToken,
    message: 'User is logged succesfully',
    data: user,
  })
})

export const AuthControllers = {
  singupUser,
  loginUser
}
