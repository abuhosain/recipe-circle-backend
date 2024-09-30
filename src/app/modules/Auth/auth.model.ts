import { model, Schema, Types } from 'mongoose';
import { IUser, UserModel } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Trim whitespace
      lowercase: true, // Convert to lowercase for consistency
    },
    password: {
      type: String,
      required: true,
      select: false, // Set select to false to exclude it from query results by default
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user', // Default role can be user
    },
    followers: [{
      type: Types.ObjectId,
      ref: 'User',
    }],
    following: [{
      type: Types.ObjectId,
      ref: 'User',
    }],
    phone: {
      type: String,
      required: true,
      unique: true, // Ensure unique phone numbers if applicable
    },
    profilePicture: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      required: true,
      default: false,
    },
    username: {
      type: String,
      required: true,
      unique: true, // Ensure unique usernames
    },
    bio: {
      type: String,
      maxlength: 160, // Limit bio length if necessary
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  try {
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next();
  } catch (error : any) {
    return next(error); // Handle errors if hashing fails
  }
});

// Method to find user by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password'); // Always include password for comparison
};

// Set password to an empty string after saving for security
userSchema.post('save', function (doc, next) {
  doc.password = ''; // Clear password after saving
  next();
});

// Method to compare password during login
userSchema.statics.isUserPasswordMatch = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Export the user model
export const User = model<IUser, UserModel>('User', userSchema);
