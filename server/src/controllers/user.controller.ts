import { NextFunction, Request, Response } from 'express';
import { HTTP_CODE } from '../enums/HTTP_CODE';
import { responseSuccess } from '../server.response';
import ServerErrorException from '../exceptions/ServerErrorException';
import * as UserService from '../services/user.service';
import { FetchedUserResponse } from '../dto/auth.dto';

export const me = async (
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<void> => {
   try {
      const data = await UserService.findUser({ _id: req.userId });
      if (data) {
         const user: FetchedUserResponse = {
            username: data.username,
            email: data.email,
            createdAt: data.createdAt,
         };
         return responseSuccess(res, HTTP_CODE.OK, user);
      }
   } catch (err) {
      console.log(err);
      next(new ServerErrorException());
   }
};
