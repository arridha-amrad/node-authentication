import express from "express"
import passport from "passport"
import { Request, Response, NextFunction } from "express"
import OAuthFacebook from "../controllers/OAuthFacebook"

const router = express.Router()

router.get("/login", passport.authenticate("facebook", { session: false }))

router.get("/callback",
   passport.authenticate("facebook", {
      assignProperty: "federatedUser",
      failureRedirect: `${process.env.CLIENT_ORIGIN!}/login`
   }),
   async (req: Request, res: Response, __: NextFunction) => await OAuthFacebook(req, res)
)

export default router