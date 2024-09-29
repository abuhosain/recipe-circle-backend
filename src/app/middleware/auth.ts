import { NextFunction, Request, Response } from 'express'
import { IUserRole } from '../modules/Auth/auth.interface'
import catchAsync from '../utils/catchAsynch'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import config from '../config'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../modules/Auth/auth.model'

const auth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
      return next(
        new AppError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        ),
      )
    }

    try {
      // Verifying token
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload

      // Check if user exists
      const { email } = decoded
      const user = await User.isUserExistsByEmail(email)

      if (!user) {
        return next(new AppError(httpStatus.NOT_FOUND, 'User not found'))
      }

      // Check if user has required role
      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(decoded.role as IUserRole)
      ) {
        return next(
          new AppError(
            httpStatus.UNAUTHORIZED,
            'You have no access to this route',
          ),
        )
      }

      // Assign decoded user information to req.user
      req.user = decoded
      next()
    } catch (err) {
      return next(
        new AppError(
          httpStatus.UNAUTHORIZED,
          'You have no access to this route',
        ),
      )
    }
  })
}

export default auth
