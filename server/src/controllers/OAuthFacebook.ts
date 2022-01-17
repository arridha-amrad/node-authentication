import { Request, Response } from "express";
import nanoid from "nanoid/async"
import { v4 } from "uuid";
import { set } from "../database/redisClient";
import UserModel from "../models/UserModel";
import { signAccessToken, signRefreshToken } from "../services/JwtService";
import { encrypt } from "../utils/Encrypt";

interface FacebookUser {
   id: string
   displayName: string
   emails: [{ value: string }]
   photos: [{ value: string }]
}

const OAuthFacebook = async (req: Request, res: Response) => {
   try {
      const facebookUser = req.federatedUser as FacebookUser
      const randomNumber = await nanoid.customAlphabet("1234567890", 4)()
      const username = facebookUser.emails[0].value.split("@")[0] + randomNumber
      const email = facebookUser.emails[0].value
      const name = facebookUser.displayName
      const avatarURL = facebookUser.photos[0].value
      const user = await UserModel.findOne({ email })
      if (user && user.strategy !== "facebook") {
         return res.redirect(
            `${process.env.CLIENT_ORIGIN}/login?e=` +
            encodeURIComponent(
               'Another user has been registered with this email',
            ),
         );
      }
      let myUser;
      if (!user) {
         const newUser = new UserModel({
            email,
            username,
            fullName: name,
            avatarURL,
            isActive: true,
            isVerified: true,
            jwtVersion: v4(),
            strategy: "facebook"
         })
         myUser = await newUser.save()
      } else {
         myUser = user
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
   } catch (err) {
      console.log(err)
      res.redirect(
         `${process.env.CLIENT_ORIGIN}/login?e=` +
         encodeURIComponent(
            'Something went wrong',
         ),
      );
   }
}

export default OAuthFacebook