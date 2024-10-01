import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { ILoginUser, IUser } from './auth.interface'
import { User } from './auth.model'
import { emit } from 'process'
import { createToken } from './auth.utils'
import config from '../../config'

const signUpUserIntoDb = async (payload: IUser) => {
  const user = await User.findOne({ username: payload.username })
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This userName is already taken')
  }
  const result = await User.create(payload)
  return result
}

const loginUser = async (payload: ILoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);

  

  // if user not found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
  }

  if(user.isDeleted){
    throw new AppError(httpStatus.BAD_REQUEST, "This user is deleted")
  }
  if(user.isBlocked){
    throw new AppError(httpStatus.BAD_REQUEST, "This user is block")
  }

  if (!(await User.isUserPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Incorrect password')
  }

  // access Granted token and refresh token;
  //   create token and sent to the client

  const jwtPayload = {
    id : user?._id,
    email: user?.email,
    role: user?.role,
    name: user?.name,
    userName: user?.username,
    profilePicture: user?.profilePicture,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  )

  const { email } = user

  const userData = await User.findOne({ email })

  return {
    accessToken,
    user: userData,
  }
}

export const AuthServices = {
  signUpUserIntoDb,
  loginUser,
}
