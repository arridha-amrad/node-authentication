import { Request, Response } from 'express';
import { ExceptionType } from '../interfacesAndTypes/ExceptionTypes';

export const errorMiddleware = (
   err: ExceptionType,
   _: Request,
   res: Response,
): Response<void> => {
   return res.status(err.status).send({ ...err });
};
