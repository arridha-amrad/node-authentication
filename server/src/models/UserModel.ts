import mongoose, { Model } from 'mongoose';
import { IUserModel } from '../interfacesAndTypes/UserInterfaces';
import argon2 from 'argon2';

const UserSchema = new mongoose.Schema<IUserModel, Model<IUserModel>, IUserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      required: true,
      default: 'user',
    },
    password: {
      type: String,
      required: true,
    },
    strategy: {
      type: String,
      required: true,
      enum: ['default', 'google', 'facebook'],
    },
    requiredAuthAction: {
      type: String,
      enum: ['null', 'emailVerification', 'resetPassword'],
    },
    jwtVersion: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  const hashedPassword = await argon2.hash(this.password);
  this.password = hashedPassword;
  next();
});

const UserModel = mongoose.model<IUserModel>('User', UserSchema);

export default UserModel;
