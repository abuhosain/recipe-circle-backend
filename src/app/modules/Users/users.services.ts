import { JwtPayload } from 'jsonwebtoken'
import { User } from '../Auth/auth.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { IUser } from '../Auth/auth.interface'

const getUserFromDb = async (payload: JwtPayload) => {
  const user = await User.findOne({ email: payload?.email })
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  return user
}

const updateUserIntoDb = async (email: string, payload: Partial<IUser>) => {
  const user = await User.isUserExistsByEmail(email)
  // if user not found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
  }

  const { email: newEmail, username : newUsername } = payload

  const emailCheck = await User.isUserExistsByEmail(newEmail as string)
  const userNameCheck = await User.findOne({username: newUsername as string})

  if (emailCheck) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This email is already taken')
  }

  if (userNameCheck) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This userName is already taken')
  }

  const updatedUser = await User.findOneAndUpdate({ email: email }, payload, {
    new: true,
  })

  return updatedUser
}

const deleteUserAccountFromDb = async (id : string) => {
    const result = await User.findByIdAndUpdate({isDeleted : true});
    return result;
}

export const UserServices = {
  getUserFromDb,
  updateUserIntoDb,
  deleteUserAccountFromDb
}
