import { NextFunction, Request, Response } from 'express';
import { AuthenticationStrategy, RequiredAuthAction } from '../enums/UserEnum';
import { v4 } from 'uuid';
import argon2 from 'argon2';
import sendEmail from '../services/MailService';
import { emailConfirmation, resetPasswordRequest } from '../templates/MailTemplates';
import * as JwtService from '../services/JwtService';
import * as msg from '../templates/NotificationTemplates';
import { responseSuccess, responseWithCookie, responseWithCookieOnly } from '../ServerResponse';
import { HTTP_CODE } from '../enums/HTTP_CODE';
import * as Validator from '../validators/AuthValidator';
// import { OAuth2Client, TokenPayload } from 'google-auth-library';
// import { IUser } from '../model/user/IUser';
import * as UserService from '../services/UserService';
import { BadRequestException } from '../exceptions/BadRequestException';
import Exception from '../exceptions/Exception';
import ServerErrorException from '../exceptions/ServerErrorException';

import * as redis from '../database/redisClient';

import { decrypt, encrypt } from '../utils/Encrypt';
import { LoginRequest, RegisterRequest } from '../dto/AuthData';

export const checkIsAuthenticated = async (req: Request, res: Response): Promise<void> => {
  const cookieId = req.cookies.COOKIE_ID;
  const LOGIN_COOKIE = req.cookies.LOGIN_COOKIE;
  if (cookieId && LOGIN_COOKIE) {
    const user = await UserService.findUserById(cookieId);
    if (user?.isLogin) {
      res.send('login');
    }
  } else {
    res.send('not login');
  }
};

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email, username, password }: RegisterRequest = req.body;
  const { errors, valid } = Validator.registerValidator({
    email,
    password,
    username,
  });
  if (!valid) next(new BadRequestException(errors));
  try {
    const savedUser = await UserService.save({
      ...req.body,
      strategy: AuthenticationStrategy.default,
      requiredAuthAction: RequiredAuthAction.emailVerification,
    });
    const tokenLink = await JwtService.createEmailLinkToken(savedUser.email);
    if (tokenLink) {
      // encryptedTokenLink may produce with '/', which affect our routes
      const encryptedTokenLink = encrypt(tokenLink).replaceAll('/', '_');
      await sendEmail(savedUser.email, emailConfirmation(savedUser.username, encryptedTokenLink));
    }
    return responseSuccess(res, HTTP_CODE.CREATED, msg.registerSuccess(savedUser.email));
  } catch (err) {
    console.error(err);
    if (err.keyPattern.email === 1) {
      return next(new Exception(HTTP_CODE.BAD_REQUEST, msg.duplicateData(email)));
    }
    if (err.keyPattern.username === 1) {
      return next(new Exception(HTTP_CODE.BAD_REQUEST, msg.duplicateData(username)));
    }
    return next(new ServerErrorException());
  }
};

export const emailVerificationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { token } = req.params;
  try {
    const replacedToken = token.replaceAll('_', '/');
    const decryptedTokenLink = decrypt(replacedToken);
    const payload = await JwtService.verifyTokenLink(decryptedTokenLink);
    const user = await UserService.findUserByUsernameOrEmail(payload.email);
    // const user = await User.findOne({ email }).select('+requiredAuthAction');
    if (user) {
      if (user.requiredAuthAction !== RequiredAuthAction.emailVerification) {
        return next(new Exception(HTTP_CODE.BAD_REQUEST, 'wrong action'));
      }
      if (user.isVerified) {
        return next(new Exception(HTTP_CODE.BAD_REQUEST, 'Account already verified'));
      }
      if (!user.isVerified) {
        await UserService.findUserByIdAndUpdate(user.id, {
          isVerified: true,
          requiredAuthAction: RequiredAuthAction.null,
          isActive: true,
          jwtVersion: v4(),
        });
        return responseSuccess(res, HTTP_CODE.OK, msg.emailVerified(user.username));
      }
    }
  } catch (err) {
    console.log('confirmEmail errors : ', err);
    return next(new ServerErrorException());
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { identity, password }: LoginRequest = req.body;
  const { valid, errors } = Validator.loginValidator({
    identity,
    password,
  });
  if (!valid) {
    return next(new BadRequestException(errors));
  }
  try {
    const user = await UserService.findUserByUsernameOrEmail(identity);
    if (!user) {
      return next(new Exception(HTTP_CODE.NOT_FOUND, 'user not found'));
    }
    if (!user.isVerified) {
      return next(new Exception(HTTP_CODE.FORBIDDEN, msg.emailNotVerified));
    }
    const isMatch = await argon2.verify(user.password ?? '', password);
    if (!isMatch) {
      return next(new Exception(HTTP_CODE.FORBIDDEN, msg.invalidPassword));
    }
    await UserService.findUserByIdAndUpdate(user.id, { isLogin: true });
    const accessToken = await JwtService.signAccessToken(user);
    const refreshToken = await JwtService.signRefreshToken(user);
    if (accessToken && refreshToken) {
      const encryptedAccessToken = encrypt(accessToken);
      const encryptedRefreshToken = encrypt(refreshToken);
      // store refreshToken to redis
      await redis.set(`${user.id}_refToken`, encryptedRefreshToken);
      return responseWithCookie(res, encryptedAccessToken, user);
    }
  } catch (err) {
    console.log(err);
    return next(new ServerErrorException());
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // verify the token first
    const userId = req.cookies.COOKIE_ID;
    if (userId) {
      // update user credential
      await UserService.findUserByIdAndUpdate(req.userId, {
        isLogin: false,
      });
      await redis.del(`${userId}_refToken`);
      // delete user's cookie
      res.clearCookie(process.env.COOKIE_NAME);
      res.clearCookie(process.env.COOKIE_ID);
      res.send('logout successfully');
    }
  } catch (error) {
    console.log(error);
    return next(new ServerErrorException());
  }
};

export const refreshTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const cookieId = req.cookies.COOKIE_ID;
    const encryptedRefreshToken = await redis.get(`${cookieId}_refToken`);
    const bearerRefreshToken = decrypt(encryptedRefreshToken ?? '');
    const token = bearerRefreshToken.split(' ')[1];
    const payload = await JwtService.verifyRefreshToken(token);
    const user = await UserService.findUserById(payload?.userId ?? '');
    if (user) {
      if (user.jwtVersion !== payload?.jwtVersion ?? '') {
        return next(new Exception(HTTP_CODE.METHOD_NOT_ALLOWED, 'expired jwt version'));
      }
      const newAccessToken = await JwtService.signAccessToken(user);
      const newRefreshToken = await JwtService.signRefreshToken(user);
      // update cookie
      if (newAccessToken && newRefreshToken) {
        const newEncryptedAccessToken = encrypt(newAccessToken);
        const newEncryptedRefreshToken = encrypt(newRefreshToken);
        await redis.set(`${cookieId}_refToken`, newEncryptedRefreshToken);
        return responseWithCookieOnly(res, newEncryptedAccessToken);
      }
    }
  } catch (err) {
    console.log(err);
    return next(new ServerErrorException());
  }
};

export const forgotPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email } = req.body;
  const { errors, valid } = Validator.forgotPasswordValidator(email);
  if (!valid) {
    return next(new BadRequestException(errors));
  }
  try {
    const user = await UserService.findUserByUsernameOrEmail(email);
    if (!user) {
      return next(new Exception(HTTP_CODE.NOT_FOUND, msg.userNotFound));
    }
    if (!user.isVerified) {
      return next(new Exception(HTTP_CODE.FORBIDDEN, msg.emailNotVerified));
    }
    // update user credentials
    const updated = await UserService.findUserByIdAndUpdate(user.id, {
      isLogin: false,
      requiredAuthAction: RequiredAuthAction.resetPassword,
    });
    if (updated) {
      const token = await JwtService.createEmailLinkToken(email);
      if (token) {
        const encryptedToken = encrypt(token).replaceAll('/', '_');
        await sendEmail(email, resetPasswordRequest(user.username, encryptedToken));
        return responseSuccess(res, HTTP_CODE.OK, msg.forgotPassword(email));
      }
    }
  } catch (err) {
    console.log('forgotPassword : ', err);
    return next(new ServerErrorException());
  }
};

export const resetPasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { password } = req.body;
  const { encryptedLinkToken } = req.params;
  const { errors, valid } = Validator.resetPasswordValidator(password);
  if (!valid) {
    return next(new BadRequestException(errors));
  }
  try {
    const token = decrypt(encryptedLinkToken.replaceAll('_', '/'));
    const payload = await JwtService.verifyTokenLink(token);
    const user = await UserService.findUserByUsernameOrEmail(payload.email);
    if (user) {
      if (user.requiredAuthAction !== RequiredAuthAction.resetPassword) {
        return next(new Exception(HTTP_CODE.BAD_REQUEST, 'Action not granted'));
      }
      // update user's jwtVersion, password, requiredAuthAction
      await UserService.findUserByIdAndUpdate(user.id, {
        jwtVersion: v4(),
        requiredAuthAction: RequiredAuthAction.null,
        password: await argon2.hash(password),
      });
      // return
      return responseSuccess(res, HTTP_CODE.OK, msg.resetPassword);
    }
  } catch (err) {
    console.log('confirmEmail errors : ', err);
    return next(new ServerErrorException());
  }
};

// export const googleAuth = async (req: Request, res: Response) => {
//    //! Set Google Client
//    const client = new OAuth2Client({
//       clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
//       redirectUri: process.env.CLIENT_ORIGIN!,
//    });

//    try {
//       //! Get Login Ticket.
//       const googleResponse = await client.verifyIdToken({
//          idToken: req.body.tokenId,
//          audience: process.env.GOOGLE_OAUTH_CLIENT_ID!,
//       });

//       //! Get User email, name from his account.
//       const { email_verified, email, given_name } =
//          googleResponse.getPayload() as TokenPayload;

//       if (email_verified) {
//          //! If the email has been registered .
//          const isEmailRegistered = await User.find({
//             email,
//             $or: [
//                { strategy: Strategy.default },
//                { strategy: Strategy.facebook },
//             ],
//          });
//          if (isEmailRegistered.length > 0) {
//             return responseFailure(res, HTTP_CODE.BAD_REQUEST, {
//                generic: 'Email already registered with different account',
//             });
//          }
//          let user: IUser | null;
//          user = await User.findOne({ email, strategy: Strategy.google }).select(
//             '+jwtVersion'
//          );

//          // email is not registered yet
//          const randomNumber = Math.ceil(Math.random() * 10000);
//          if (!user) {
//             user = await User.create({
//                // email: email!,
//                strategy: Strategy.google,
//                username: given_name + randomNumber.toString(),
//                requiredAuthAction: RequiredAuthAction.null,
//                isActive: true,
//                isLogin: true,
//                isVerified: true,
//                password: 'google',
//                jwtVersion: v4(),
//             });
//          }
//          // Grab the jwtVersion.
//          const jwtVersion = user.jwtVersion;
//          user.isLogin = true;
//          await user.save();
//          if (!jwtVersion) {
//             return responseFailure(res, HTTP_CODE.FORBIDDEN, {
//                generic: msg.userNotFound,
//             });
//          }
//          // Sign Access Token and Refresh Token .
//          const accessToken = 'Bearer ' + (await signAccessToken(user.id));
//          const refreshToken =
//             'Bearer ' + (await signRefreshToken(user.id, jwtVersion));
//          // return with create cookie
//          return responseWithCookie(res, refreshToken, accessToken);
//       }
//    } catch (err) {
//       console.log(err);
//       return serverError(res);
//    }
// };
