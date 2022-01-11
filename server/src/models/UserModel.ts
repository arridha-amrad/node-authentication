import mongoose from 'mongoose';
import { IUserModel } from '../interfacesAndTypes/IUserModel';

const UserSchema = new mongoose.Schema(
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
         enum: ['none', 'emailVerification', 'resetPassword'],
      },
      jwtVersion: {
         type: String,
      },
      isActive: {
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

const UserModel = mongoose.model<IUserModel>('User', UserSchema);

export default UserModel;
