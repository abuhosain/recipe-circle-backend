import { model, Schema } from 'mongoose'
import { IUser, UserModel } from './auth.interface'
import bcrypt from 'bcrypt'
import config from '../../config'
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
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
    },
    phone: {
      type: String,
      required: true,
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
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// password
userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password')
}

// set empty string after saving password
userSchema.post('save', function (doc, next) {
  doc.password = ''
  // console.log(this, "we saved our data");
  next()
})

userSchema.statics.isUserPasswordMatch = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const User = model<IUser, UserModel>('User', userSchema)
