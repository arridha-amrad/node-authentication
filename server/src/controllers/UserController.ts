import { NextFunction, Request, Response } from 'express';
import { HTTP_CODE } from '../enums/HTTP_CODE';
import { responseSuccess } from '../ServerResponse';
import ServerErrorException from '../exceptions/ServerErrorException';
import UserModel from '../models/UserModel';

export const me = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<void> => {
   try {
      const data = await UserModel.findById(req.userId);
      if (data) {
         return responseSuccess(res, HTTP_CODE.OK, data);
      }
   } catch (err) {
      console.log(err);
      next(new ServerErrorException());
   }
};
