import { Model, Types } from 'mongoose'
import { USER_ROLE } from './auth.constance'

export interface IUser {
  _id? : Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
  username: string;
  profilePicture: string;
  isPremium: boolean;
  bio? : string;
  isDeleted : boolean;
  isBlocked : boolean;
}

export interface ILoginUser {
  email: string
  password: string
}

export type IUserRole =  keyof typeof USER_ROLE;

export type INewUser = {
  password: string
  role: string
  email: string
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>
  isUserPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
