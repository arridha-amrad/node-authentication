import { Request, Response } from 'express';
import axios from 'axios';
import qs from 'qs';
import UserModel from '../models/UserModel';
import { v4 } from 'uuid';
import { signAccessToken, signRefreshToken } from '../services/JwtService';
import { encrypt } from '../utils/Encrypt';
import { set } from '../database/redisClient';

interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export const getGoogleUser = async (
  id_token: string,
  access_token: string,
): Promise<GoogleUserResult> => {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      },
    );
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};

export async function getGoogleOAuthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
    code,
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: 'authorization_code',
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return res.data;
  } catch (error: any) {
    console.error('myError', error.response.data.error);
    console.error(error, 'Failed to fetch Google Oauth Tokens');
    throw new Error(error.message);
  }
}

export const googleOauthHandler = async (req: Request, res: Response) => {
  // get the code from qs
  const code = req.query.code as string;
  try {
    // get the id and accessToken with the code
    const { access_token, id_token } = await getGoogleOAuthTokens({ code });
    // get user with tokens
    const googleUser = await getGoogleUser(id_token, access_token);
    // upsert the user
    if (!googleUser.verified_email) {
      res.status(403).json({ message: 'Google account is not verified' });
    }
    const user = await UserModel.findOne({
      email: googleUser.email,
    });

    if (user && user.strategy !== "google") {
      return res.redirect(
        `${process.env.CLIENT_ORIGIN}/login?e=` +
        encodeURIComponent(
          'Another user has been registered with this email',
        ),
      );
    }

    const { email, family_name, given_name, name, picture } = googleUser;
    let myUser;
    if (!user) {
      const composedUser = new UserModel({
        avatarURL: picture,
        email,
        fullName: `${given_name} ${family_name}`,
        username: name.split(" ").join(""),
        isActive: true,
        isVerified: true,
        jwtVersion: v4(),
        strategy: 'google',
      });
      myUser = await composedUser.save();
    } else {
      myUser = user;
    }
    // create accessToken and refreshToken
    const accessToken = await signAccessToken(myUser);
    const refresh_token = await signRefreshToken(myUser);
    const encryptedAccessToken = encrypt(accessToken!);
    const encryptedRefreshToken = encrypt(refresh_token!);
    await set(`${myUser.id}_refToken`, encryptedRefreshToken);
    res.cookie(process.env.COOKIE_ID, myUser.id);
    res.cookie(process.env.COOKIE_NAME, encryptedAccessToken);
    res.redirect(process.env.CLIENT_ORIGIN);
    // set cookies
  } catch (err) {
    console.log(err);
    res.redirect(`${process.env.CLIENT_ORIGIN}/login`);
  }
};
