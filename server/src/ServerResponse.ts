import { Response } from 'express';
import { LoginResponse } from './dto/AuthData';
import { HTTP_CODE } from './enums/HTTP_CODE';

export const responseWithCookie = (
  res: Response,
  encryptedAccessToken: string,
  user: LoginResponse,
): void => {
  res
    .status(200)
    .cookie(process.env.COOKIE_NAME, encryptedAccessToken, {
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 5,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .cookie(process.env.COOKIE_ID, user.id, {
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 5,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .json({
      data: {
        ...user,
      },
    });
};

export const responseWithCookieOnly = (res: Response, encryptedAccessToken: string): void => {
  res
    .status(200)
    .cookie(process.env.COOKIE_NAME, encryptedAccessToken, {
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 5,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .send('cookie renew');
};

// export const responseFailure = <T>(res: Response, status: HTTP_CODE, errors: T): void => {
//   res.status(status).json({
//     errors: errors,
//     success: null,
//   });
// };

export const responseSuccess = <T>(res: Response, status: HTTP_CODE, data: T): void => {
  res.status(status).json({
    data,
  });
};

// export const serverError = (res: Response): void => {
//   res.status(500).json({
//     error: {
//       generic: 'Something went wrong',
//     },
//   });
// };
