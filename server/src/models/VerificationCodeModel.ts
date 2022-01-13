import mongoose from 'mongoose';
import { IUserModel } from '../interfacesAndTypes/IUserModel';

interface IVerificationCodeModel {
   code: string;
   owner: IUserModel;
   isComplete: boolean;
}

const VerificationCodeSchema = new mongoose.Schema(
   {
      code: {
         type: String,
         required: true,
      },
      owner: {
         type: mongoose.Types.ObjectId,
         ref: 'User',
      },
      isComplete: {
         type: Boolean,
         default: false,
      },
   },
   { timestamps: true },
);

const VerificationCodeModel = mongoose.model<IVerificationCodeModel>(
   'VerificationCode',
   VerificationCodeSchema,
);

export default VerificationCodeModel;
