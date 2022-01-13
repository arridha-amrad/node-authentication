import mongoose from 'mongoose';
import { IUserModel } from '../interfacesAndTypes/IUserModel';

const UserSchema = new mongoose.Schema(
   {
      fullName: {
         type: String,
      },
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
      avatarURL: {
         type: String,
         default:
            'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png',
      },
      role: {
         type: String,
         enum: ['user', 'admin', 'moderator'],
         required: true,
         default: 'user',
      },
      password: {
         type: String,
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
