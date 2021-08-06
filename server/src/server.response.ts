import { Response } from 'express';
import { LoginResponse } from './dto/auth.dto';
import { HTTP_CODE } from './enums/HTTP_CODE';

export const responseWithCookie = (
   res: Response,
   encryptedAccessToken: string,
   loginUserData: LoginResponse,
): void => {
   res.status(200)
      .cookie('LOGIN_CREDENTIALS', encryptedAccessToken, {
         sameSite: 'lax',
         maxAge: 1000 * 60 * 60 * 24 * 365,
         httpOnly: true,
         secure: process.env.NODE_ENV.trim() === 'production',
      })
      .json({
         data: {
            ...loginUserData,
         },
      });
};

export const responseWithCookieOnly = (
   res: Response,
   accessToken: string,
): void => {
   res.status(200)
      .cookie('LOGIN_CREDENTIALS', accessToken, {
         sameSite: 'lax',
         maxAge: 1000 * 60 * 60 * 24 * 365,
         httpOnly: true,
         secure: process.env.NODE_ENV.trim() === 'production',
      })
      .send('cookie renew');
};

export const responseFailure = <T>(
   res: Response,
   status: HTTP_CODE,
   errors: T,
): void => {
   res.status(status).json({
      errors: errors,
      success: null,
   });
};

export const responseSuccess = <T>(
   res: Response,
   status: HTTP_CODE,
   data: T,
): void => {
   res.status(status).json({
      errors: null,
      data,
   });
};

export const serverError = (res: Response): void => {
   res.status(500).json({
      error: {
         generic: 'Something went wrong',
      },
   });
};
