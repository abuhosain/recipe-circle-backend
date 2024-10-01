import { NextFunction, Request, Response } from 'express';
import { IUserRole } from '../modules/Auth/auth.interface';
import catchAsync from '../utils/catchAsynch';
import httpStatus from 'http-status';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/Auth/auth.model';

const OptionalAuth = (...requiredRoles: IUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    // If no token is provided, proceed without authentication
    if (!token) {
      req.user = null; // Set req.user to null if no token is provided
      return next(); // Allow the request to continue
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

      // Check if user exists
      const { email } = decoded;
      const user = await User.isUserExistsByEmail(email);

      if (!user) {
        req.user = null; // Set user to null if not found
        return next(); // Allow the request to continue
      }

      // Assign the user information to req.user
      req.user = decoded; // Attach the user info to the request

      // Check if user has required role if roles are specified
      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(decoded.role as IUserRole)
      ) {
        req.user = null; // Reset user if they don't have the required role
        return next(); // Allow the request to continue
      }

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      req.user = null; // Set user to null if token verification fails
      return next(); // Allow the request to continue
    }
  });
};

export default OptionalAuth;
